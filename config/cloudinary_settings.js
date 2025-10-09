const dotenv = require('dotenv')
const cloudinary = require("cloudinary").v2;

dotenv.config()

cloudinary.config({
    cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.APP_CLOUDINARY_API_KEY,
    api_secret: APP_CLOUDINARY_SECRET_KEY
})  

module.exports = {cloudinary}