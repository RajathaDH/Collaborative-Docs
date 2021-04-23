const socketio = require('socket.io');

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;
const server = socketio(SOCKET_PORT);