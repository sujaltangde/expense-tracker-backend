const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter valid email address"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please enter a password"]
    },


    balance: {
        type: Number,
        default: 0
    },
    expense: {
        type: Number,
        default: 0
    },
    income: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)
module.exports = User