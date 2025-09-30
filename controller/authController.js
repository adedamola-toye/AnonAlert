const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


//REGISTER
async function register(req, res){
    try{
        const {username, email, phoneNo, password} = req.body
        if(!username || !email || !phoneNo ||!password){
            return res.status(400).json({message:"All fields are mandatory"})
        }

        const existingAdmin = await Admin.findOne({email});

        if(existingAdmin){
           return res.status(400).json({message:"User already registered."})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.create({
            username,
            email,
            phoneNo,
            password_hash: hashedPassword
            
        });

        return res.status(201).json({
        message: "Admin registered successfully",
        data: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            phoneNo: admin.phoneNo,
        },
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"})
    }
}

//LOGIN
async function login(req, res){
    try{
        const {username, email, password} = req.body

    if(!username && !email){
        res.status(400).json({message:"Username or email required"})
    }
    if(!password){
        res.status(400).json({message:"Password required"})
    }

    const admin = await Admin.findOne(username ? {username} : {email})
    if(!admin){
        return res.status(401).json({message: "User doesn't exist."});
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if(!isMatch){
        res.status(401).json({message: "Invalid login credentials"});
    }

    const payload = {
          _id:admin._id,
        username: admin.username,
        email: admin.email,
        phoneNo: admin.phoneNo,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({message: 'Login successful', token})
    }
    
    catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"})
    }
}
module.exports={register, login}