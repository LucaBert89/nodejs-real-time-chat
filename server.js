const mongo = require("mongodb").MongoClient;
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
//const client = require("socket.io").listen(4000).sockets;

app.get('/', (req, res) => {
    const filePath = __dirname;
    res.sendFile(path.join(filePath, 'views','index.html'));
});

app.listen(3000)

mongo.connect(
    process.env.DB_CONN
)
.then(result => {
    console.log("connected");
})
.catch(err => {
    console.log(err);
})
;