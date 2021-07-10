const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();


require('dotenv').config();

const loginRoute = require("./routes/auth")
const chatRoute = require("./routes/chat");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(loginRoute);
app.use(chatRoute);


mongoose.connect(
    process.env.DB_CONN,
    { useUnifiedTopology: true,
     useNewUrlParser: true }
)
.then(result => {
    app.listen(3000)
    console.log("connected");
 
})
.catch(err => {
    console.log(err);
});   




