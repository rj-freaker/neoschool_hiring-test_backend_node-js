const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URL;

async function connectMongoDB() {
    try {

        await mongoose.connect(url);
        console.log("Connected to MongoDB Atlas");

    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

module.exports = connectMongoDB;