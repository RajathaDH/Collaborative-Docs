import Quill from 'quill';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
import 'quill/dist/quill.snow.css';
import './styles.css';

const SERVER_URL = 'http://localhost:3000';

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean']
];

function init() {
    const url = new URL(window.location.href);
    const documentId = url.searchParams.get('documentId');
    
    if (!documentId) {
        const randomDocumentId = nanoid(6);

        window.location = `${window.location.origin}?documentId=${randomDocumentId}`;
    } else {
        const quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: TOOLBAR_OPTIONS
            }
        });

        quill.disable();
        quill.setText('Loading document....');
    
        const socket = io(SERVER_URL);

        socket.emit('get-document', documentId);

        socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();
        });
    
        // listen for text changes from client and send to server
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source !== 'user') return;
    
            socket.emit('client-changes', delta);
        });
    
        // listen for changes from server and update client
        socket.on('server-changes', delta => {
            quill.updateContents(delta);
        });

        setInterval(() => {
            const documentContent = quill.getContents();

            socket.emit('save-document', documentContent);
        }, 2000);
    }
}

init();