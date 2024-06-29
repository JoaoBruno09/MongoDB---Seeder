const mongoose = require("mongoose");
const {fakerPT_PT } = require('@faker-js/faker');

//GENERATE RANDOM INTERVENTION
function generateRandomIntervention(customerNumber, accountNumber){
    const creationTime = fakerPT_PT.date.past();
    const actualDate = Date();
    const description = fakerPT_PT.helpers.arrayElement([
    'Titular', 
    'Administrador'
    ]);

    return {
      creationTime: creationTime,
      description: description,
      lastUpdateTime: fakerPT_PT.date.between({creationTime, actualDate}),
      interventionType: getInterventionType(description),
      accountNumber: accountNumber,
      customerNumber: customerNumber
    };
}

function getInterventionType(description){
    switch (description) {
        case 'Titular':
            return 'TT'
        case 'Administrador':
            return 'AD'
        default:
            return '';
    }
}

//INTERVENTION SCHEMA MODEL
const interventionSchema = new mongoose.Schema({
    creationTime:{
        type: Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lastUpdateTime:{
        type:Date,
        required:true
    },
    interventionType:{
        type:String,
        required:true
    },
    accountNumber:{
        type:String,
        required:true
    },
    customerNumber:{
        type:String,
        required:true
    }
})
const Intervention = mongoose.model("Intervention", interventionSchema)

module.exports.interventionSchema = Intervention;
module.exports.generateIntervention =  generateRandomIntervention;
