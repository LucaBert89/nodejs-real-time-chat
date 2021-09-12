let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origins: ["https://real-chat-app-l.herokuapp.com/", "https://real-chat-app-l.herokuapp.com/chat/:id"]
    }
  });
  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    
   socket.on("typing", (data) => {
    //data = typing true or false. Everyone expect myself should see someone is typing
     socket.broadcast.emit("typing", data);
   })
    
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
   
  });

   
  
};

exports.sendMessage = (message) => io.emit("message", message);