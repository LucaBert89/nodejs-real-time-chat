const path = require('path');
const User = require("../models/users")

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
    User.findOne({email:email})
    .then(singleUser => {
        if(singleUser) {
            return res.redirect("/signup");
        }
        const user = new User({
            email:email,
            password:password
        });
        return user.save();
    })
    .then(result => {
        if(result) {
            return res.redirect("/login")
        }
        
    })
    .catch(err => {
        console.log(err);
    })
};