const mongoose = require("mongoose");
const {fakerPT_PT } = require('@faker-js/faker');

//GENERATE RANDOM RELATION
function generateRandomRelation(customerId){
    const creationTime = fakerPT_PT.date.past();
    const actualDate = Date();
    const description = fakerPT_PT.helpers.arrayElement([
    'Tutor',
    'Progenitor',
    'Procurador',
    'Adminitrador',
    'Gerente',
    'Diretor',
    'Cabeça de Casal',
    'Sócio-Gerente']);

    return {
      _id: fakerPT_PT.string.uuid(),
      creationTime: creationTime,
      childId: customerId,
      description: description,
      fatherId: fakerPT_PT.string.uuid(),
      lastUpdateTime: fakerPT_PT.date.between({creationTime, actualDate}),
      relationType: getRelationType(description)
    };
}

function getRelationType(description){
    switch (description) {
        case 'Tutor':
            return 'TT'
        case 'Progenitor':
            return 'PG'
        case 'Procurador':
            return 'PC'
        case 'Adminitrador':
            return 'AD'
        case 'Gerente':
            return 'G'
        case 'Diretor':
            return 'D'
        case'Cabeça de Casal':
            return 'CC'
        case 'Sócio-Gerente':
            return 'SG'
        default:
            return '';
    }
}

//RELATION SCHEMA MODEL
const relationSchema = new mongoose.Schema({
    _id:{
     type: String,
     required:true   
    },
    creationTime:{
        type: Date,
        required:true
    },
    childId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    fatherId:{
        type:String,
        required:true
    },
    lastUpdateTime:{
        type:Date,
        required:true
    },
    relationType:{
        type:String,
        required:true
    }
})
const Relation = mongoose.model("Relation", relationSchema)

module.exports.relationSchema = Relation;
module.exports.generateRelation =  generateRandomRelation;
