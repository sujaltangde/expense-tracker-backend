const mongoose = require('mongoose')
const validator = require('validator')

const TransactionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: [true, "Please enter a description"]
    },    
    amount: {
        type: Number,
        validate: {
            validator: (value)=> {
                return value > 0; 
            },
            message: "Amount must be greater than 0"
        },
        required: [true, "Please enter an amount"]
    },
    category: {
        type: String,
        enum: ["expense", "income"],
        required: [true, "Please enter a category"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Transaction = mongoose.model('Transaction', TransactionSchema)
module.exports = Transaction