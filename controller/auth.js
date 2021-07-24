const path = require('path');
const User = require("../models/users")

const jwt = require('jsonwebtoken');


//handle error messages
const handleErrors = (err) => {
    let errors = {email:"", password: ""};
 
    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    //email address already registeredì
    if(err.code === 11000){
        errors.email = "that email is already registered";
        return errors;
    }
    console.log(errors);
    return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, "my-secret", {
        expiresIn: maxAge
    })
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
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        return res.status(201).json(user); 
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});
    }
};