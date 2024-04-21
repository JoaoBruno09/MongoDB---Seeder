const mongoose = require("mongoose");
const {fakerPT_PT } = require('@faker-js/faker');

//GENERATE RANDOM CARD
function generateRandomCard(accountId){
    return {
      _id: fakerPT_PT.string.uuid(),
      annualFee: fakerPT_PT.commerce.price({ min: 5, max: 20, dec: 2 }),
      cvc: fakerPT_PT.finance.creditCardCVV(),
      number: fakerPT_PT.finance.creditCardNumber(),
      type: fakerPT_PT.helpers.arrayElement(['Cartão de débito',
                                            'Cartão de crédito', 
                                            'Cartão de débito diferido',
                                            'Cartão pré-pago',
                                            'Cartão dual ou misto']),
      accountId: accountId,
      customerId: fakerPT_PT.string.uuid(),
    };
}

//CARD SCHEMA MODEL
const cardSchema = new mongoose.Schema({
    _id:{
     type: String,
     required:true   
    },
    annualFee:{
        type:Number,
        required:true
    },
    cvc:{
        type:Number,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    accountId:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
})
const Card = mongoose.model("Card", cardSchema)

module.exports.cardSchema = Card;
module.exports.generateCard =  generateRandomCard;
