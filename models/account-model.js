const mongoose = require("mongoose");

//ACCOUNT SCHEMA MODEL
const accountSchema = new mongoose.Schema({
    name:{
     type:String,
     required:true   
    },
    price:{
        type:Number,
        required:true
    }
})
const Account = mongoose.model("Account",accountSchema)

module.exports = Account;
