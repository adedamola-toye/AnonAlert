import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;

const ReportSchema = new mongoose.Schema({
    /* reporterId : {
        type: ObjectId,
        ref: 'Reporter',
        required: true,
        default: null
    }, */
    trackingId:{
        type:String,
        unique: true,
    },
    text: {
        type:String,
        required: true,
    },
    media: [{
        type: ObjectId,
        ref: 'Media',
        default: null
    }],
    category: {
        type:String,
        enum: ['Domestic Violence', 'Cyber Harassment', 'Fraud/Scam', 'Sexual Harassment', 'Child Abuse', 'Missing Persons'],
        required: true
    },
    location:{
        type:ObjectId,
        ref: 'Location',
        default: null
    },
    status:{
        type: String,
        enum: ['pending', 'in-review', 'resolved', 'flagged'],
        default: 'pending',
        required: true
    },
    credibilityScore:{
        type:  mongoose.Types.Decimal128,
        required:true,
        default: 0
    },
    forwardedTo: {
        type:ObjectId,
        ref: 'Organization',
        default: null
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    tags: {
        type: [String],
        required: true,
        default: []
    }
})

const ReportModel = mongoose.model("Report", ReportSchema)
export default ReportModel