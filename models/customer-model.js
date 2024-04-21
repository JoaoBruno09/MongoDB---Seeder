const mongoose = require("mongoose");

//CUSTOMER SCHEMA MODEL
const customerSchema = new mongoose.Schema({
    name:{
     type:String,
     required:true   
    },
    price:{
        type:Number,
        required:true
    }
})
const Customer = mongoose.model("Customer",customerSchema)


module.exports = Customer;