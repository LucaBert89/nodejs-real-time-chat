const express = require("express");

const router = express.Router();

const authPage = require("../controller/auth");

router.post('/login', authPage.postLoginPage);

router.post('/signup', authPage.postSignUpPage);


//router.get('/chat', authPage.getSignUpPage);

module.exports = router;