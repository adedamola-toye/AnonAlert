const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const AdminSchema = new mongoose.Schema({
    username:{
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
    password_hash:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        default: Date.now()
    }
})

const AdminModel = mongoose.model("admin", AdminSchema)
export default AdminModel;