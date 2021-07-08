const express = require("express");
const router = express.Router();

const chatPage = require("../controller/chat");

router.get('/chat', chatPage.getChatPage);

module.exports = router;
