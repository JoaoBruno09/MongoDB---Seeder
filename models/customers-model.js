const mongoose = require("mongoose");

//SAVE EXISTING CUSTOMER
function saveExistingCustomer(customerId, customerNumber){
    return {
      _id: customerId, 
      customerNumber: customerNumber,
    };
}

//CUSTOMERS SCHEMA MODEL
const customersSaverSchema = new mongoose.Schema({
  _id:{
    type: String,
    required:true   
  },
  customerNumber:{
    type: String,
    required:true   
  }
})
const CustomersSaver = mongoose.model("CustomersSaver", customersSaverSchema)

module.exports.customersSaverSchema = CustomersSaver;
module.exports.saveExistingCustomer =  saveExistingCustomer;