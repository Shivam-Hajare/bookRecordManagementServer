const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({ path: "./config.env" })
const DB=process.env.DATABASE

mongoose.connect(DB, 
    {useNewUrlParser: true
    }).then(()=>{
        console.log("DB connection successful");
    }).catch((err)=>{
        console.log(err);
    });