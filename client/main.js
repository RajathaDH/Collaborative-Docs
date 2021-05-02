import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function init() {
    const quill = new Quill('#editor', {
        theme: 'snow'
    });
}

init();