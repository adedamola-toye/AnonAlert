
import mongoose from 'mongoose';


const NGOSchema = new mongoose.Schema({
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

const NGOModel = mongoose.model("ngo", NGOSchema)
export default NGOModel;