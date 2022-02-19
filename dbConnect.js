const mongoose = require("mongoose")
require("dotenv").config()

const connect = mongoose.connect(process.env.DB_URL)

connect.then(()=>{
    console.log("Database Connected");
}).catch((error)=>{
    console.log("Database Connection Failed");
})

module.exports = connect