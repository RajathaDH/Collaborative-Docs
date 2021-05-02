import Quill from 'quill';
import { io } from 'socket.io-client';
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
    const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: TOOLBAR_OPTIONS
        }
    });

    const socket = io(SERVER_URL);

    
}

init();