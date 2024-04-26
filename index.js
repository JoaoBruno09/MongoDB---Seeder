require('dotenv').config();
const dBSeeder = require("./seederDB")
const mongoose = require("mongoose")

const seedCount = 40000;
const uriDB = process.env.URL_MONGO_DB + process.env.ACCOUNT_DB_NAME;

setMongooseConnection(uriDB)
dBSeeder.seedData(seedCount);

function setMongooseConnection(uri){
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to db " + uri)
    }).catch((err) => {
        console.log("error", err)
    })

    return mongoose;
}