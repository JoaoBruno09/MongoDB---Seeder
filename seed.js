// require the necessary libraries
require('dotenv').config();
const {fakerPT_PT } = require('@faker-js/faker');
const mongoose = require("mongoose")
const Account = require("./models/account-model")
const Account = require("./models/account-model")

async function seedData() {
    // Connection URL
    const uri = process.env.URL_MONGO_DB;
    const seed_count = 5000;
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db")
    }).catch((err) => {
        console.log("error", err)
    })

    let timeSeriesData = [];

    
    // create 5000 fake data
    for (let i = 0; i < seed_count; i++) {
        const name = fakerPT_PT.person.fullName();
        const price = fakerPT_PT.commerce.price()
        timeSeriesData.push({ name, price });
    }

    const seedDB = async () => {
        await Account.insertMany(timeSeriesData)
    }

    seedDB().then(() => {
        mongoose.connection.close()
        console.log("seed success")
    })
}

seedData()