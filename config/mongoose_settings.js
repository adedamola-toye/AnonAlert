
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.set("strictQuery", true);


mongoose.connect(process.env.mongoDB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err =>console.error("Connection error: ", err));
    