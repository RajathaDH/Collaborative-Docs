if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const socketio = require('socket.io');
const mongoose = require('mongoose');

const Document = require('./models/Document');

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const io = socketio(SOCKET_PORT, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', async (documentId) => {
        const document = await getDocument(documentId);

        socket.join(documentId);

        socket.emit('load-document', document.data);

        socket.on('client-changes', delta => {
            socket.broadcast.to(documentId).emit('server-changes', delta);
        });

        socket.on('save-document', async (data) => {
            await Document.findOneAndUpdate({ documentId: documentId }, { data: data });
        });
    });
});

async function getDocument(documentId) {
    const document = await Document.findOne({ documentId: documentId });

    if (document) return document;

    const newDocument = await Document.create({ documentId: documentId, data: '' });

    return newDocument;
}