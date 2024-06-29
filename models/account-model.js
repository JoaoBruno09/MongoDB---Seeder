const mongoose = require("mongoose");
const {fakerPT_PT } = require('@faker-js/faker');

//GENERATE RANDOM ACCOUNT
function generateRandomAccount(onlineBankingIndicator){
    const creationTime = fakerPT_PT.date.past();
    const actualDate = Date();
    let accountIban = fakerPT_PT.finance.iban({ formatted: true, countryCode: 'PT' });

    return {
      _id: mongoose.Types.ObjectId.createFromBase64(fakerPT_PT.string.alphanumeric({ length: { min: 16, max: 16 } })),
      accountManager: fakerPT_PT.person.fullName(),
      active: true,
      currencyCode: 'EUR',
      creationTime: creationTime,
      iban: accountIban,
      hasValidDocs: true,
      lastUpdateTime: fakerPT_PT.date.between({creationTime, actualDate}),
      number: accountIban.trim().replaceAll(" ","").substring(accountIban.length - 23).slice(0,-1),
      onlineBankingIndicator: onlineBankingIndicator,
      status: 'COMPLETED',
      phase: 4,
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
     type: mongoose.Types.ObjectId,
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
    hasValidDocs:{
        type:Boolean,
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
    phase:{
        type: Number,
        required: true
    },
    type:{
        type:String,
        required:true
    }
})
const Account = mongoose.model("Account",accountSchema)

module.exports.accountSchema = Account;
module.exports.generateAccount =  generateRandomAccount;
