
import mongoose from 'mongoose';


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
    categoriesHandled: [{
        type:String,
        enum: ['Domestic Violence', 'Cyber Harassment', 'Fraud/Scam', 'Sexual Harassment', 'Child Abuse', 'Missing Persons'],
        required: true
    }],
    statesCovered:[{
        type:String,
        required: true
    }]
})

const OrganizationModel = mongoose.model("ngo", OrganizationSchema)
export default OrganizationModel;