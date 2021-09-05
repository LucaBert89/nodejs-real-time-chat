const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();
const { socketConnection } = require('./utils/socket-io');
const cors = require('cors');
app.set('view engine', 'ejs');

require('dotenv').config();

const loginRoute = require("./routes/auth")
const chatRoute = require("./routes/chat");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()) 
app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'  }))

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
    const server = app.listen(5000);
    socketConnection(server);
})
.catch(err => {
    console.log(err);
});   




