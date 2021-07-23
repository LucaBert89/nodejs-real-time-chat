const express = require("express");
const router = express.Router();

const chatPage = require("../controller/chat");
const {verify} = require("../middlewares/auth.js");

router.get('/chat', chatPage.getChatPage);
router.post('/refresh', verify, chatPage.postChatPage);

module.exports = router;
