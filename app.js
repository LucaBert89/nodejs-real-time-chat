const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const { socketConnection } = require('./utils/socket-io');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

require('dotenv').config();

const loginRoute = require("./routes/auth")
const chatRoute = require("./routes/chat");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()) 
app.use(express.json())
app.use(cors({credentials: true, origin: 'https://real-chat-app-l.herokuapp.com/'}))

app.use(loginRoute);
app.use(chatRoute);
app.use(express.static(path.join(__dirname, "client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html')
  )});




mongoose.connect(
    process.env.DB_CONN,
    { useUnifiedTopology: true,
     useNewUrlParser: true }
)
.then(result => {
    console.log("connected")
    socketConnection(http);
    http.listen(PORT);
})
.catch(err => {
    console.log(err);
});   




