const path = require('path');
const User = require("../models/users")

const jwt = require('jsonwebtoken');


//handle error messages
const handleErrors = (err) => {
    let errors = {username: "", email:"", password: ""};
    //error handling for login
    if(err.message === "incorrect username") errors.username = "incorrect username";
    if(err.message === "incorrect email") errors.email = "the email is not registered";
    if(err.message === "incorrect password") errors.password = "the password is incorrect";
    //error handling for signup
    if(err.message === "username already registered") errors.username = "username already registered";
    if(err.message === "email already registered") errors.email = "email already registered";
    //error handling using validator
    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;  
}

//create the token JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h"
    })
}

exports.postLoginPage = async function(req, res) {
    const {username, email, password} = req.body;
    
    try {
        //User.login inside users.js model check the correct data and return the user
        const user = await User.login(username, email, password);
        const token = createToken(user._id);
        //send JWT via cookie
        res.cookie("jwt", token, {httpOnly: true});
        return res.status(200).json({user: user._id}); 
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});
    }
}

exports.postSignUpPage = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        //checkDuplicate inside model user.js check if the data are already in the database
        const checkDuplicate = await User.checkDuplicate(username, email);
        if(!checkDuplicate.username && !checkDuplicate.user) {
            const user = await User.create({username, email, password});
            return res.status(201).json(user); 
        }
        
    }
    catch (err) {
        const errors = handleErrors(err);
        console.log("questo errore", err);
        res.status(400).json({errors});
    }
};

//logOut route to clear all the cookies
exports.logOut = async (req, res) => {
  res.status(200).clearCookie('jwt')
  res.json({message:"Log-out"})
};