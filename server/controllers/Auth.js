const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// signup
exports.signUp = async(req, res) => {
    try{
        // data fetch from the request body
        const {
            userName,
            email,
            role,
            password,
            confirmPassword,
        } = req.body;

        // validation
        if(!userName || !email || !password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            })
        }

        // Password match karlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm Password  does not Match, Plese try again ",
            });
        }

        // check user Already exist or not 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already Registered, Please try to login",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashed password",hashedPassword);

        // entry creation in db
        const user = await User.create({
            userName,
            email,
            password:hashedPassword,
            role,
        });

        // return response
        return res.status(200).json({
            success:true,
            message:"Signup Successfull, Please Login ",
            data:user,
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered,Please try again",
        });
    }
}

// login
exports.login = async(req, res) => {
    try{
        // get data from req body
        const {email, password} = req.body;
        console.log("email",email,password);
        // validation 
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required ,please try again",
            });
        }

        // user check exist or not 
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered ,Please signup first",
            });
        }
        console.log("user.password",user.password);
        console.log("password",password)
        // generate Jwt , after password matching 
        if(await bcrypt.compare(password,user.password)){
            
            

            const payload = {
                email:user.email,
                id:user._id,
                role:user.role,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET , {
                expiresIn: "2h",
            })
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const Options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,Options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully "
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure ,Please try again",
        });
    }
}