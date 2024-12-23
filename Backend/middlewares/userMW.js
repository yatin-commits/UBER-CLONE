// userMW.js
import { validationResult } from "express-validator";
import createUser from "../services/userServices.js";  // Import the createUser function
import userModel from "../models/user.model.js";
const registerUser = async (req, res, next) => {
    console.log("hi");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname,firstname, lastname, email, password } = req.body;

    console.log(firstname);

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
    res.status(200).json({token,user});         
}

export { registerUser, loginUser };
