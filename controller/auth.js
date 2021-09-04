const path = require('path');
const User = require("../models/users")

const jwt = require('jsonwebtoken');


//handle error messages
const handleErrors = (err) => {
    let errors = {email:"", password: ""};
 
    //error handling for login
    if(err.message === "incorrect email") errors.email = "the email is not registered";
    if(err.message === "incorrect password") errors.password = "the password is incorrect";

    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    //email address already registered
    if(err.code === 11000){
        errors.email = "that email is already registered";
        return errors;
    }
    console.log(errors);
    return errors;  
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
    })
}

exports.getLoginPage = (req, res) => {
    const filePath = __dirname;
    res.render(path.join(filePath, '../', 'views','login.ejs'))
};

exports.postLoginPage = async function(req, res) {
    const {email, password} = req.body;
    
    try {
        console.log("ok");

        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true});
        return res.status(200).json({user: user._id}); 
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});
    }
}

exports.getSignUpPage = (req, res) => {
    const filePath = __dirname;
    res.render(path.join(filePath, '../', 'views','signup.ejs'))
};


exports.postSignUpPage = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try {
        console.log("signup");
        const user = await User.create({email, password});
        return res.status(201).json(user); 
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});
    }
};