// userMW.js

import { validationResult } from "express-validator";
import createUser from "../services/userServices.js";  // Import the createUser function
import userModel from "../models/user.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";
const registerUser = async (req, res, next) => {
    console.log("hi");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname,firstname, lastname, email, password } = req.body;
    // Check if the user already exists
    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    // Hash the password using the userModel's static method
    const hashedPassword = await userModel.hashPassword(password);
    
    // Call createUser function to create a new user
    const user = await createUser({
        firstname:fullname.firstName,
        lastname:fullname.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
};

const loginUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const{email,password}=req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user)
    {
        return res.status(401).json({message:"Invalid Email or Password"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch)
    {
        return res.status(401).json({message:"Invalid Email or Password"});
    }
    const token = user.generateAuthToken();  
    console.log(token);
    res.cookies('token',token);
    res.status(200).json({token,user});         
}
const getUserProfile = async (req, res, next) => {s
    res.status(200).json({ user: req.user });
};

const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    
    const token = (req.cookies && req.cookies.token) || (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[1]);   s
    await blackListTokenModel.create({token});
    res.status(200).json({ message: "Logged out successfully" });
};

export { registerUser, loginUser, getUserProfile,logoutUser};  
