const path = require('path');
const User = require("../models/users")
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res) => {
    const filePath = __dirname;
    res.sendFile(path.join(filePath, '../', 'views','index.html'));
};

exports.postLoginPage = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then(user => {
            if(!user) {
                return res.redirect("/login");
            }
            bcrypt.compare(password, user.password).then(result => {
                if(result) {
                    return res.redirect("/chat");
                }
                return res.redirect("/login")
            })
            .catch(err => {
                console.log(err);
                return res.redirect("/login")
            })
        })
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
        return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
        if(hashedPassword) {
            const user = new User({
                email:email,
                password:hashedPassword
            });
            return user.save();
        }
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