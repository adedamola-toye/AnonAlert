const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const LocationSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required: true,
    }
})
const LocationModel = mongoose.model("Location", LocationSchema)
module.exports = LocationModel