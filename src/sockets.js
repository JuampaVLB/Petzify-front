import io from 'socket.io-client';

const socket = io("http://192.168.0.3:5000");

export default socket;