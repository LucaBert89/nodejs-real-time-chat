const express = require("express");

const router = express.Router();

const authPage = require("../controller/auth");


router.get('/login', authPage.getLoginPage);

router.post('/login', authPage.postLoginPage);

router.get('/signup', authPage.getSignUpPage);

router.post('/signup', authPage.postSignUpPage);

module.exports = router;