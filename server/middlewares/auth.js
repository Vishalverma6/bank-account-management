const jwt = require("jsonwebtoken");
require("dotenv").config();


// auth
exports.auth = async(req, res, next) => {
    try{
        const token = req.cookies.token 
                        || req.body.token 
                        ||req.header("Authorization")?.replace("Bearer ", "").trim();
        
        // if token missing ,then send response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }
        console.log("token",token)
        // verification of token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            // verification issue
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token ",
        });
    }
}

// isUser
exports.isUser = async(req, res, next) => {
    try{
        if(req.user.role !== "user"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for user only",
            });
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified ,please try again later",
        });
    }
}

// is Admin
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only",
            });
        }
        next();

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified ,please try again later",
        });
    }
}