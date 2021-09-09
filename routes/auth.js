const express = require("express");

const router = express.Router();

const authPage = require("../controller/auth");

router.post('/api/login', authPage.postLoginPage);

router.post('/api/signup', authPage.postSignUpPage);


//router.get('/chat', authPage.getSignUpPage);

module.exports = router;