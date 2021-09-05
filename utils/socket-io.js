let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origins: ["*"]
    }
  });
  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

exports.sendMessage = (message) => io.emit("message", message);