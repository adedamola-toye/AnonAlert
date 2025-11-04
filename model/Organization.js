
import mongoose from 'mongoose';
import { ACCEPTABLE_CATEGORIES, ACCEPTABLE_STATES } from '../utils/enums.js';


const OrganizationSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phoneNo:{
        type: String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        default: Date.now
    },
    categoriesHandled: {
        type:[String],
       enum: ACCEPTABLE_CATEGORIES,
        required: true
    },
    statesCovered:{
        type:[String],
        required: true,
        enum: ACCEPTABLE_STATES
    }
})

const OrganizationModel = mongoose.model("ngo", OrganizationSchema)
export default OrganizationModel;