const mongoose = require('mongoose');
const emailValidator = require('email-validator');
require('dotenv').config();
const db_link = process.env.db_link;

mongoose.connect(db_link).then(() => {
    console.log("SuccessFully Connected to the Database");
}).catch((err) => {
    console.log("There was Some Error while connecting to the database" + err.message);
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name is Required"],
        maxlength: 64
    },
    email: {
        type: String,
        unique: [true,"Email is Already Associated"],
        required: [true,"Email is Required"],
        validate: {
            validator: function() {
                return emailValidator.validate(this.email);
            },
            message: () => "Not an valid email"
        }
    },
    password: {
        type: String,
        required: [true,"Password is Required"],
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true,"Password Must Be Confirmed"],
    //     validate: {
    //         validator: function() {
    //             return this.confirmPassword === this.password;
    //         }
    //     }
    // },
    role: {
        type: String,
        enum: ['admin','user'],
    },
    profilePic: {
        type: String
    },
    otp : {
        type : Number
    },
    otpExpiry : {
        type : Date
    }
});
const userModel = mongoose.model("User",userSchema);
module.exports = userModel;