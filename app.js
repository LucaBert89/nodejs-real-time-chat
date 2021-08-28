const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const { socketConnection } = require('./utils/socket-io');
const chatRoom = require("./models/chat")
const User = require("./models/users")
app.set('view engine', 'ejs');

require('dotenv').config();

const loginRoute = require("./routes/auth")
const chatRoute = require("./routes/chat");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use(loginRoute);
app.use(chatRoute);


mongoose.connect(
    process.env.DB_CONN,
    { useUnifiedTopology: true,
     useNewUrlParser: true }
)
.then(result => {
    console.log("connected")
    const server = app.listen(3000);
    socketConnection(server);
    /*io.on("connection", function(socket){
      console.log("user Connected")
      socket.on("message", async (message) => {
        console.log(message.messages)
        const findUser = await User.findById(message.messages[0].sender).exec();
        const ok = await chatRoom.findByIdAndUpdate(message.id, {$push: {"messages": message.messages[0]}})
        const databack = {
            user: findUser,
            room: message
          }
          io.emit("message", (message, databack));

      })
      
    })
 */
})
.catch(err => {
    console.log(err);
});   




