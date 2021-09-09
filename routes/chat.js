const express = require("express");
const router = express.Router();

const chatPage = require("../controller/chat");

const {verify} = require("../middlewares/auth.js");


router.get('/api/roomlist', verify, chatPage.getRoomList);

router.post('/api/room', verify, chatPage.postRoom);

router.post('/api/topic', verify, chatPage.getTopic);

router.post('/api/addMessage', verify, chatPage.postMessage);
router.get('/api/chat/:id', verify, chatPage.getMessage);
//router.post('/refresh', verify, chatPage.postChatPage);

module.exports = router;
