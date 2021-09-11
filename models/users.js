const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:[true,"Please enter an username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Please enter an email"],
        unique: true,
        validate: [isEmail,"Please enter a valid format"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [6, "Minimum password length is 6 characters"]
    }
})

// using a Mongoose pre hook to hash the password before the user enter in the database
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//login a User using a static mongoose method: Error handling
userSchema.statics.login = async function(username, email, password) {
    const userName = await this.findOne({username});
    if(!userName) throw Error("incorrect username");
    const user = await this.findOne({email});
    if(!user) throw Error("incorrect email");
    // compare the password inserted with the user's database password
        const checkAuth = await bcrypt.compare(password, user.password);
        console.log(checkAuth);
    if(!checkAuth) throw Error("incorrect password");
        return user;
}

//check if username or email are already in the database
userSchema.statics.checkDuplicate = async function(username, email) {
    const userName = await this.findOne({username});
    if(userName) throw Error("username already registered");
    const user = await this.findOne({email});
    if(user) throw Error("email already registered");
    return ({username: userName, user:user});
}

module.exports = mongoose.model("User", userSchema);