import app from '../app';
import config from './config/config';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: `http://localhost:${config.frontendPort}`,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    socket.broadcast.emit('receive_message', data);
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
