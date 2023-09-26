const app = require('./app')
const databaseConnection = require('./config/database')
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})



databaseConnection() ;



app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})