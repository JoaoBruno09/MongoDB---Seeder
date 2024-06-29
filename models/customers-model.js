const mongoose = require("mongoose");

//SAVE EXISTING CUSTOMER
function saveExistingCustomer(customerNumber, isValid, accounts){
    return {
      customerNumber: customerNumber,
      isValid: isValid,
      accounts: accounts
    };
}

//CUSTOMERS SCHEMA MODEL
const customersSaverSchema = new mongoose.Schema({
  customerNumber:{
    type: String,
    required:true   
  },
  isValid:{
    type: Boolean,
    required: true
  },
  accounts:{
    type: Object,
    required:true   
  }
})
const CustomersSaver = mongoose.model("CustomersSaver", customersSaverSchema)

module.exports.customersSaverSchema = CustomersSaver;
module.exports.saveExistingCustomer =  saveExistingCustomer;