const express = require("express");
const router = express.Router();

const chatPage = require("../controller/chat");

const {verify} = require("../middlewares/auth.js");


router.get('/roomlist', verify, chatPage.getRoomList);

router.post('/room', verify, chatPage.postRoom);

router.post('/topic', verify, chatPage.getTopic);

router.post('/addMessage', verify, chatPage.postMessage);
router.get('/chat/:id', verify, chatPage.getMessage);
//router.post('/refresh', verify, chatPage.postChatPage);

module.exports = router;
