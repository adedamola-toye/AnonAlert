const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ReportSchema = new mongoose.Schema({
    reporter : {
        type: ObjectId,
        ref: 'Reporter',
        required: true
    },
    trackingId:{
        type:String,
        unique: true,
    },
    text: {
        type:String,
        required: true,
    },
    media: {
        type: ObjectId,
        ref: 'Media'
    },
    category: {
        type:String,
        enum: ['Domestic Violence', 'Cyber Harassment', 'Fraud/Scam', 'Sexual Harassment', 'Child Abuse', 'Missing Persons'],
        required: true
    },
    location:{
        type:ObjectId,
        ref: 'Location'
    },
    status:{
        type: String,
        enum: ['pending', 'in-review', 'resolved', 'flagged'],
        default: 'pending',
        required: true
    },
    credibilityScore:{
        type:  mongoose.Types.Decimal128,
        required:true
    },
    forwardedTo: {
        type:ObjectId,
        ref: 'Organization',
        //required: true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    tags: {
        type: [String],
        required: true,
        default: []
    }
})

const ReportModel = mongoose.model("admin", ReportSchema)
module.exports = ReportModel