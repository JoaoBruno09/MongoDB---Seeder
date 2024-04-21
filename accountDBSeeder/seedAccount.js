// require the necessary libraries
require('dotenv').config();
const mongoose = require("mongoose")
const accountModel = require("../models/account-model")
const cardModel = require("../models/card-model")

async function seedData() {
    // Connection URL
    const uri = process.env.URL_MONGO_DB + process.env.ACCOUNT_DB_NAME;
    const seed_count = 1000;
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })
    
    let accountsData = [];
    let cardsData = [];        
    // create 5000 fake data
    for (let i = 0; i < seed_count; i++) {
        const accountGenerated = accountModel.generateAccount();
        accountsData.push(accountGenerated);
        cardsData.push(cardModel.generateCard(accountGenerated._id));
    }
    
    const seedDB = async () => {
        await accountModel.accountSchema.insertMany(accountsData)
        await cardModel.cardSchema.insertMany(cardsData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

module.exports.seedData = seedData();