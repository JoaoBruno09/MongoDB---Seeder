const mongoose = require("mongoose");
const {fakerPT_PT } = require('@faker-js/faker');

//GENERATE RANDOM CUSTOMER
function generateRandomCustomer(){
    const creationTime = fakerPT_PT.date.past();
    const actualDate = Date();
    const fatherLastName = fakerPT_PT.person.lastName();
    const gender = fakerPT_PT.person.sex();
    let clientNumber = 'C' + fakerPT_PT.string.numeric(9);

    return {
      accounts: [],
      addresses: [],
      annualIncome: fakerPT_PT.number.float({ min: 10000, max: 100000, fractionDigits: 2 }),
      birthDate: fakerPT_PT.date.past(),
      cardIndicator: fakerPT_PT.datatype.boolean(),
      contacts: [],
      createdTime: creationTime,
      documentIdCountry: 'PT',
      documentIdNumber: '36687036 0 ZX8',
      documentIdType: 'CC',
      documentIdExpirationDate: fakerPT_PT.date.future(),
      educationLevel: fakerPT_PT.helpers.arrayElement([
      'Ensino básico',
      'Ensino secundário', 
      'Licenciatura',
      'Mestrado',
      'Bacharlato',
      'Doutoramento']),
      fatherName: fakerPT_PT.person.firstName({sex: 'male'}) + ' ' + fatherLastName,
      firstName: fakerPT_PT.person.firstName(gender),
      gender: gender,
      intervenientIndicator: fakerPT_PT.datatype.boolean(),
      isValid: true,
      lastName: fatherLastName,
      lastUpdateTime:fakerPT_PT.date.between({creationTime, actualDate}),
      motherName: fakerPT_PT.person.fullName({sex: 'female'}),
      nationality: 'Português',
      number: clientNumber,
      onlineBankingIndicator: fakerPT_PT.datatype.boolean(),
      profession: fakerPT_PT.person.jobTitle(),
      relationIndicator: fakerPT_PT.datatype.boolean(),
      taxIdCountry: 'PT',
      taxIdNumber: '251881601',
      taxIdType: 'CC',
      type: 'PARTICULAR'
    };
}

function generateRandomAddress(){
  return {
    _id: mongoose.Types.ObjectId.createFromBase64(fakerPT_PT.string.alphanumeric({ length: { min: 16, max: 16 } })),
    city: fakerPT_PT.location.city(),
    country: 'Portugal',
    street: fakerPT_PT.location.streetAddress(),
    zip: fakerPT_PT.location.zipCode()
  }
}

function generateRandomContact(){
  const creationTime = fakerPT_PT.date.anytime();
  const actualDate = Date();
  const type = fakerPT_PT.helpers.arrayElement([
    'Telemóvel',
    'E-mail'])

  return {
    _id: mongoose.Types.ObjectId.createFromBase64(fakerPT_PT.string.alphanumeric({ length: { min: 16, max: 16 } })),
    type: type,
    value: type == 'Telemóvel' ? fakerPT_PT.phone.number() : fakerPT_PT.internet.email(),
    creationTime: creationTime,
    lastUpdateTime: fakerPT_PT.date.between({creationTime, actualDate}),
  }
}

//CUSTOMER SCHEMA MODEL
const customerSchema = new mongoose.Schema({
  accounts:{
    type: Object,
    required:true   
  },
  addresses:{
    type: Object,
    required:true   
  },
  annualIncome:{
    type: Number,
    required:true   
  },
  birthDate:{
    type: Date,
    required:true   
  },
  cardIndicator:{
    type: Boolean,
    required:false   
  },
  contacts:{
    type: Object,
    required:true   
  },
  createdTime:{
    type: Date,
    required:true   
  },
  documentIdCountry:{
    type: String,
    required:true   
  },
  documentIdNumber:{
    type: String,
    required:true   
  },
  documentIdType:{
    type: String,
    required:true   
  },
  documentIdExpirationDate:{
    type: Date,
    required:true   
  },
  educationLevel:{
    type: String,
    required:true   
  },
  fatherName:{
    type: String,
    required:true   
  },
  firstName:{
    type: String,
    required:true   
  },
  gender:{
    type: String,
    required:true   
  },
  intervenientIndicator:{
    type: Boolean,
    required:false   
  },
  isValid:{
    type: Boolean,
    required:false   
  },
  lastName:{
    type: String,
    required:true   
  },
  lastUpdateTime:{
    type: Date,
    required:true   
  },
  motherName:{
    type: String,
    required:true   
  },
  nationality:{
    type: String,
    required:true   
  },
  number:{
    type: String,
    required:true   
  },
  onlineBankingIndicator:{
    type: Boolean,
    required:false   
  },
  profession:{
    type: String,
    required:true   
  },
  relationIndicator:{
    type: Boolean,
    required:false   
  },
  taxIdCountry:{
    type: String,
    required:true   
  },
  taxIdNumber:{
    type: String,
    required:true   
  },
  taxIdType:{
    type: String,
    required:true   
  },
  type:{
    type: String,
    required:true   
  },
})
const Customer = mongoose.model("Customer", customerSchema)

//ADDRESS SCHEMA MODEL
const addressSchema = mongoose.Schema({
  _id:{
    type: mongoose.Types.ObjectId,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  street:{
    type: String,
    required: true
  },
  zip:{
    type: String,
    required: true
  }
})
const Address =  mongoose.model("Address", addressSchema)

//CONTACT SCHEMA MODEL
const contactSchema = mongoose.Schema({
  _id:{
    type: mongoose.Types.ObjectId,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  value:{
    type: String,
    required: true
  },
  creationTime:{
    type: Date,
    required: true
  },
  lastUpdateTime:{
    type: Date,
    required: true
  }
})
const Contact =  mongoose.model("Contact", contactSchema)


module.exports.customerSchema = Customer;
module.exports.addressSchema = Address;
module.exports.contactSchema = Contact;
module.exports.generateCustomer =  generateRandomCustomer;
module.exports.generateAddress =  generateRandomAddress;
module.exports.generateContact = generateRandomContact;