const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')


// Make New Transaction
exports.makeTransaction = async (req, res) => {
    try {

        const user = await User.findById(req.user._id)

        const {description,amount,category,createdAt} = req.body ;


        if(user.balance === 0 && category === "expense"){
            return res.status(400).json({
                success: false,
                message: "You cannot add expense in Zero balance."
            })
        }

        if(user.balance < amount && category === "expense"){
            return res.status(400).json({
                success: false,
                message: "Balance is lower than amount"
            })
        }

        if(user.balance >= amount && category === "expense"){
            // subtract balance - amount
            user.balance -= amount ;
            user.expense += amount ;
            await user.save() ;
        }



        if(user.balance >= 0 && category === "income"){
            // add balance + amount
            user.balance += amount ;
            user.income += amount ;
            await user.save() ;
        }   

        const newTransaction = await Transaction.create({
            description,
            amount,
            category,
            createdAt,
            user:req.user._id
        })

        res.status(200).json({
            success: true,
            newTransaction,
            message: "Transaction Added"
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Get All Transactions of Logged In User
exports.getAllTransactions = async (req, res) => {
    try {

        const Transactions = await Transaction.find({user:req.user._id}) ;

        res.status(200).json({
            success: true,
            Transactions
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


