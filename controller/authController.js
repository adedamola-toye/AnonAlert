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

