// require the necessary libraries
const mongoose = require("mongoose")
const accountModel = require("./models/account-model")
const cardModel = require("./models/card-model")
const documentModel = require("./models/document-model")
const relationModel = require("./models/relation-model")
const interventionModel = require("./models/intervention-model")
const customerModel = require("./models/customer-model")
const customersModel = require("./models/customers-model")

async function seedData(seedCount) {
    let accountData = [];
    let cardsData = [];
    let documentData = [];
    let relationData = [];  
    let interventionData = [];
    let customerData = [];
    let addressData = [];
    let contactData = []; 
    let customersData = [];  
    
    // create fake data
    for (let i = 0; i < seedCount; i++) {
        const customerGenerated = customerModel.generateCustomer();
        const customerNumber = customerGenerated.number;
        
        const addressGenerated = customerModel.generateAddress();
        addressData.push(addressGenerated);
        const addressId = addressGenerated._id;
        const customerAddress = {addressId};
        customerGenerated.addresses.push(customerAddress)
        
        const contactGenerated = customerModel.generateContact();
        contactData.push(contactGenerated);
        const contactId = contactGenerated._id;
        const customerContact = {contactId};
        customerGenerated.contacts.push(customerContact)
        
        const accountGenerated = accountModel.generateAccount(customerGenerated.onlineBankingIndicator);
        accountData.push(accountGenerated);
        
        const accountNumber = accountGenerated.number;
        const customerAccount = {accountNumber};
        customerGenerated.accounts.push(customerAccount)

        customerData.push(customerGenerated);
        customersData.push(customersModel.saveExistingCustomer(customerNumber, customerGenerated.isValid, customerGenerated.accounts))

        documentData.push(documentModel.generateDocument(customerNumber, accountNumber));
        if(customerGenerated.cardIndicator == true) cardsData.push(cardModel.generateCard(customerNumber, accountGenerated._id));
        if(customerGenerated.relationIndicator == true) relationData.push(relationModel.generateRelation(customerNumber));
        if(customerGenerated.intervenientIndicator == true) interventionData.push(interventionModel.generateIntervention(customerNumber, accountNumber));
    }
    
    const seedDB = async () => {
        await customerModel.customerSchema.insertMany(customerData)
        await customerModel.addressSchema.insertMany(addressData)
        await customerModel.contactSchema.insertMany(contactData);
        await customersModel.customersSaverSchema.insertMany(customersData)
        await accountModel.accountSchema.insertMany(accountData)
        await cardModel.cardSchema.insertMany(cardsData)
        await documentModel.documentSchema.insertMany(documentData)
        await relationModel.relationSchema.insertMany(relationData)
        await interventionModel.interventionSchema.insertMany(interventionData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

module.exports.seedData = seedData;