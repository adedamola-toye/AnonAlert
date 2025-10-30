import { registerService, loginService } from "../services/authService";

export async function register(req, res){
    try{
        const result = await registerService(req.body);
        return res.status(201).json({
            success: true,
            message: "Organization registered successfully",
            organization: result,
        })
    }catch(error){
        const errorMessage = error.message;
        const statusCode  =error.statusCode || 500;
        console.error(`Registration request failed with status ${statusCode}`, error);
        return res.status(statusCode).json({
            success:false,
            message: statusCode === 500? "Internal Server Error": errorMessage,
            details: errorMessage
        })
    }
}

export async function login(req, res){
    try{
        const result = await loginService(req.body);
        res.cookie('jwt', result.token, {
        httpOnly: true,
        maxAge: 3600000, 
        // secure: process.env.NODE_ENV === 'production', // Use in production
        // sameSite: 'strict' // Recommended for CSRF protection
    });
        return res.status(200).json({
            success: true,
            message: "Organization logged in successfully",
            organization: result.payload,
            token: result.token
        })
    }catch(error){
        const errorMessage = error.message;
        const statusCode  =error.statusCode || 500;
        console.error(`Log in request failed with status ${statusCode}`, error);
        return res.status(statusCode).json({
            success:false,
            message: statusCode === 500? "Internal Server Error": errorMessage,
            details: errorMessage
        })
    }
}

export async function logout(req, res){
    res.cookie('jwt', '', { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 1
    });
    return res.status(200).json({
        success: true,
        message: "Logout successful"
    })
}

