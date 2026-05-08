import app from '../app';
import config from './config/config';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${config.port}`,
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1><script src="/socket.io/socket.io.js"></script><script>const socket = io();</script>')
})

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});