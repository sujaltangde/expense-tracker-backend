const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})



app.use(express.json({ limit: '10mb' }));
app.use(cors({
	origin: "*",
	credentials: true
}))




// Routes Import
const user = require("./routes/userRoutes.js")
const transaction = require("./routes/transactionRoutes.js")



app.use("/api/v1", user);
app.use("/api/v1", transaction);


app.get("/api/v1/test",(req,res)=>{
	res.json(
		"Everything Fine"
	)
})



module.exports = app;