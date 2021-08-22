const express = require("express");
const router = express.Router();

const chatPage = require("../controller/chat");

const {verify} = require("../middlewares/auth.js");

router.get('/chat', verify, chatPage.getChatPage);

router.post('/room', verify, chatPage.postRoom);

router.get('/chat/:id', verify, chatPage.getRoom);

router.post('/topic', verify, chatPage.getTopic);

router.post('/addMessage', verify, chatPage.postMessage);
//router.post('/refresh', verify, chatPage.postChatPage);

module.exports = router;
