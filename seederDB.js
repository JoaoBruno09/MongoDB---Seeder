// require the necessary libraries
const mongoose = require("mongoose")
const accountModel = require("./models/account-model")
const cardModel = require("./models/card-model")
const documentModel = require("./models/document-model")
const relationModel = require("./models/relation-model")
const interventionModel = require("./models/intervention-model")
const customerModel = require("./models/customer-model")

async function seedData(seedCount) {
    let accountsData = [];
    let cardsData = [];
    let documentData = [];
    let relationData = [];  
    let interventionData = [];
    let customerData = [];
    let addressData = [];
    let contactData = [];     
    
    // create fake data
    for (let i = 0; i < seedCount; i++) {
        const customerGenerated = customerModel.generateCustomer();
        const customerId = customerGenerated._id;
        
        const addressGenerated = customerModel.generateAddress();
        const addressId = addressGenerated._id;
        const customerAddress = {addressId};
        addressData.push(addressGenerated);

        const contactGenerated = customerModel.generateContact();
        const contactId = contactGenerated._id;
        const customerContact = {contactId};
        contactData.push(contactGenerated);
        
        const accountGenerated = accountModel.generateAccount(customerGenerated.onlineBankingIndicator);
        const accountId = accountGenerated._id;
        const customerAccount = {accountId};
        accountsData.push(accountGenerated);

        customerGenerated.accounts.push(customerAccount)
        customerGenerated.addresses.push(customerAddress)
        customerGenerated.contacts.push(customerContact)
        customerData.push(customerGenerated);

        documentData.push(documentModel.generateDocument(customerId, accountId));
        if(customerGenerated.cardIndicator == true) cardsData.push(cardModel.generateCard(customerId, accountId));
        if(customerGenerated.relationIndicator == true) relationData.push(relationModel.generateRelation(customerId));
        if(customerGenerated.intervenientIndicator == true) interventionData.push(interventionModel.generateIntervention(customerId, accountId));

    }
    
    const seedDB = async () => {
        await customerModel.customerSchema.insertMany(customerData)
        await customerModel.addressSchema.insertMany(addressData)
        await customerModel.contactSchema.insertMany(contactData);
        await accountModel.accountSchema.insertMany(accountsData)
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