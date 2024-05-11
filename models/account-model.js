const mongoose = require("mongoose");
const {fakerPT_PT } = require('@faker-js/faker');

//GENERATE RANDOM ACCOUNT
function generateRandomAccount(onlineBankingIndicator){
    const creationTime = fakerPT_PT.date.past();
    const actualDate = Date();

    return {
      _id: fakerPT_PT.string.uuid(),
      accountManager: fakerPT_PT.person.fullName(),
      active: true,
      currencyCode: 'EUR',
      creationTime: creationTime,
      iban: fakerPT_PT.finance.iban({ formatted: true, countryCode: 'PT' }),
      lastUpdateTime: fakerPT_PT.date.between({creationTime, actualDate}),
      number: fakerPT_PT.finance.accountNumber(),
      onlineBankingIndicator: onlineBankingIndicator,
      status: 'COMPLETED',
      type: fakerPT_PT.helpers.arrayElement(['Conta à ordem',
                                            'Conta base', 
                                            'Conta de Serviços Minimos Bancários',
                                            'Conta poupança',
                                            'Conta ordenado',
                                            'Conta para universitários',
                                            'Conta bancária empresarial',
                                            'Conta jovem'])
    };
}

//ACCOUNT SCHEMA MODEL
const accountSchema = new mongoose.Schema({
    _id:{
     type: String,
     required:true   
    },
    accountManager:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    currencyCode:{
        type:String,
        required:true
    },
    creationTime:{
        type:Date,
        required:true
    },
    iban:{
        type:String,
        required:true
    },
    lastUpdateTime:{
        type:Date,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    onlineBankingIndicator:{
        type:Boolean,
        required:false
    },
    status:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})
const Account = mongoose.model("Account",accountSchema)

module.exports.accountSchema = Account;
module.exports.generateAccount =  generateRandomAccount;
