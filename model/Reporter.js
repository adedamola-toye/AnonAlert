const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const ReporterSchema = new mongoose.Schema({
    anonymousID : {
        type:UUID,
        required: true,
    },
    reportsFiled: {
        type: ObjectId, 
        ref: 'Report'
    },
    //created at when first report is made
    createdAt:{
        type:Date,
        default: Date.now()
    }
})
const ReportModel = mongoose.model("admin", ReportSchema)
module.exports = ReportModel