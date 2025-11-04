import jwt from "jsonwebtoken";

export async function authMiddleware(req,res,next){
    const token = req.cookies.jwt
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Access Denied. No token found"
        })
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            console.log(`JWT Error: ${err}`)
            return res.status(401).json({
                success:false,
                message: "Access denied. Invalid or expired token"
            })
        }
        req.orgId = decoded.orgId;
        next();
    }
    )

}