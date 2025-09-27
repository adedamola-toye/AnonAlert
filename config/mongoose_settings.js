const mongoose = require('mongoose')
const dotenv = require('dotenv')

mongoose.set("strictQuery", true);

const mongoDB_URI = "";

mongoose.connect(mongoDB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err =>console.error("Connection error: ", err));
    