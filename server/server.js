const socketio = require('socket.io');

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const io = socketio(SOCKET_PORT, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('get-document', documentId => {
        const data = '';

        socket.join(documentId);

        socket.emit('load-document', data);

        socket.on('client-changes', delta => {
            socket.broadcast.to(documentId).emit('server-changes', delta);
        });
    });
});