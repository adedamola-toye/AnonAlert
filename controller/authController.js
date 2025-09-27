const Admin = require("../model/Admin");
const bcrypt = require("brcypt")

export async function register(req, res){
    const {username, email, phoneNo, password} = req.body
    if(!username || !email || !phoneNo ||!password){
        res.status(400).json({message:"All fields are mandatory"})
    }

    const existingAdmin = await Admin.findOne(email)

    if(existingAdmin){
        res.status(400).json({message:"User already registered."})
    }

    salt = 10
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
        _id:admin.id,
        username,
        email,
        phoneNo,
        password_hash: hashedPassword
        
    });
    if(admin){
        res.status(200).json({message:"Admin registered successfully", data: {password_hash, ...restOfAdmin}})
    }
    else{
        res.status(400).json({message:"Error in registering successfully"})
    }   
}

export async function login(req, res){
    const {username, email, password} = req.body

    if(!username && !email){
        res.status(400).json({message:"Username or email required"})
    }
    if(!password){
        res.status(400).json({message:"Password required"})
    }

    const admin = await Admin.findOne(email)
}
modules.exports={register}