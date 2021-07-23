const path = require('path');
const User = require("../models/users")

const jwt = require('jsonwebtoken');


//handle error messages
const handleErrors = (err) => {
    let errors = {email:"", password: ""};

    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    //email address already registeredì
    if(err.code === 11000){
        errors.email = "that email is already registered";
        return errors;
    }

    return errors;
}

exports.getLoginPage = (req, res) => {
    const filePath = __dirname;
    res.render(path.join(filePath, '../', 'views','login.ejs'))
};

exports.postLoginPage = async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
}

exports.getSignUpPage = (req, res) => {
    const filePath = __dirname;
    res.render(path.join(filePath, '../', 'views','signup.ejs'))
};

exports.postSignUpPage = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try {
        console.log("ok");
        const user = await  User.create({email, password});
        return res.status(201).json(user); 
    }
    catch (err) {
        const errors = handleErrors(err)
        console.log(err);
        res.status(400).json({errors});
    }
};