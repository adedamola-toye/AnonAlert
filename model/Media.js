const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const MediaSchema = new mongoose.Schema({
    report : {
        type:ObjectId,
        ref: 'Report',
        required:true,
    },
    media_type: {
        type: String, 
        enum: ['image', 'video'],
        required:true
    },
    url:{
        type:String,
        required: true
    },
    metadata:{
        type: String
    },
    uploadedAt:{
        type:Date,
        default: Date.now()
    }
})
const MediaModel = mongoose.model("admin", MediaSchema)
module.exports = MediaModel