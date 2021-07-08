const path = require('path');

exports.getLoginPage = (req, res) => {
    const filePath = __dirname;
    res.sendFile(path.join(filePath, '../', 'views','index.html'));
};

exports.postLoginPage = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.redirect("/chat")
}

exports.getSignUpPage = (req, res) => {
    const filePath = __dirname;
    res.sendFile(path.join(filePath, '../', 'views','signup.html'));
};

exports.postSignUpPage = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    console.log(password);
    res.redirect("/login")
};