const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const LocationSchema = new mongoose.Schema({
    report : {
        type:ObjectId,
        ref: 'Report',
        required:true,
    },
    city:{
        type:String,
        required:true
    }
})
const MediaModel = mongoose.model("admin", MediaSchema)
module.exports = MediaModel