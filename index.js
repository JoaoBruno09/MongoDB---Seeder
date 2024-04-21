const accountSeeder = require("./accountDBSeeder/seedAccount")

async () => {
    await accountSeeder.seedData();
}