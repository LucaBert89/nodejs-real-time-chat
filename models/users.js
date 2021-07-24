const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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

module.exports = mongoose.model("User", userSchema);