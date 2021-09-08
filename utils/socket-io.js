let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origins: ["https://chat-realtime-app-l.herokuapp.com/","https://chat-realtime-app-l.herokuapp.com/chat/:id" ]
    }
  });
  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    
   socket.on("typing", (data) => {
     console.log(data);
     socket.broadcast.emit("typing", data);
   })
    
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
   
  });

   
  
};

exports.sendMessage = (message) => io.emit("message", message);