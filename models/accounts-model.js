const mongoose = require("mongoose");

//SAVE EXISTING ACCOUNT
function saveExistingAccount(accountId, accountNumber){
    return {
      _id: accountId,
      accountNumber: accountNumber
    };
}

//ACCOUNTS SCHEMA MODEL
const accountsSaverSchema = new mongoose.Schema({
    _id:{
     type: String,
     required:true   
    },
    accountNumber:{
        type:String,
        required:true
    }
})
const AccountsSaver = mongoose.model("AccountsSaver", accountsSaverSchema)

module.exports.accountsSaverSchema = AccountsSaver;
module.exports.saveExistingAccount =  saveExistingAccount;
