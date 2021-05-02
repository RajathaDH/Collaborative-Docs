const socketio = require('socket.io');

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const io = socketio(SOCKET_PORT, {
    cors: {
        origin: 'http://localhost:1234',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    socket.on('client-changes', delta => {
        socket.broadcast.emit('server-changes', delta);
    });
});