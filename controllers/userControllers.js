const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { createToken } = require('../middlewares/auth')


// Register a New User
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;       

        const hashPass = await bcrypt.hash(password, 10)
        
        const user = await User.create({
            name,
            email,
            password: hashPass,
        })

        const token = createToken(user._id, user.email)

        res.status(201).json({
            success: true,
            message: "User Created",
            user,
            token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            })
        }

        const token = createToken(user._id, user.email)

        res.status(200).json({
            success: true,
            message: "User logged In Successfully",
            token
        })



    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Check if User is logged In or Not
exports.isLogin = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user) {
            return res.status(200).json({
                success: true,
                isLogin: true
            })
        } else {
            return res.status(200).json({
                success: true,
                isLogin: false
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// Get Details of Logged In User
exports.userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');;

        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}