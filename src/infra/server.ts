import app from '../app';
import config from './config/config';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const server = createServer(app);

let onlineUsers: {userId: string, socketId: string}[] = []

export const io = new Server(server, {
  cors: {
    origin: `http://localhost:${config.frontendPort}`,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipientId)

    if(user) {
      io.to(user.socketId).emit("getMessage", message)
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

    console.log("onlineUsers", onlineUsers)
    io.emit("getOnlineUsers", onlineUsers)
  });

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some(user => user.userId === userId) &&
    onlineUsers.push({
      userId,
      socketId: socket.id
    })

    console.log("onlineUsers:", onlineUsers)

    io.emit("getOnlineUsers", onlineUsers)
  })
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
