const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();
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
    app.listen(3000);
 
})
.catch(err => {
    console.log(err);
});   




