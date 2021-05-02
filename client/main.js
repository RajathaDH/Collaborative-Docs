import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './styles.css';

function init() {
    const quill = new Quill('#editor', {
        theme: 'snow'
    });
}

init();