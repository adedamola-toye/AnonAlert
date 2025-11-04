
import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.ObjectId;
import { ACCEPTABLE_STATES } from '../utils/enums.js';
const LocationSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required: true,
    },
    state:{
        type:String,
        required: true,
        enum: ACCEPTABLE_STATES
    }
})
const LocationModel = mongoose.model("Location", LocationSchema)
export default LocationModel