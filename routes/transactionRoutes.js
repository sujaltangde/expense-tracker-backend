const express = require('express')
const { makeTransaction,getAllTransactions } = require('../controllers/transactionControllers')
const {isAuthenticated} = require('../middlewares/auth')
const router = express.Router() 



router.route("/make/transaction").post(isAuthenticated, makeTransaction) ; 
router.route("/getAllTransactions").get(isAuthenticated, getAllTransactions) ; 



module.exports = router




