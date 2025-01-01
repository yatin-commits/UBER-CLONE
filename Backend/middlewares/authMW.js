import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken"
const JWT_SecretKey="yatin2104";
import captainModel from "../models/captain.model.js";
import blackListTokenModel from "../models/blackListToken.model.js";
// import cookieParser from "cookie-parser"; 


export const authUser = async (req, res, next) => { 
    
    // console.log("Inside authUser");
    
    // console.log(req.cookies);   
    const token = (req.cookies && req.cookies.token) || (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[1]);  
    if (!token) {
        console.log("No token found");
         return res.status(401).json({ message: "Authorization denied" });
    }
    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: "Authorization denied" });
    } 
    try {
        const decoded = jwt.verify(token,JWT_SecretKey);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Authorization denied" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authorization denied" });
    }
}


export const authCaptain = async (req, res, next) => {
    // console.log(req.headers);
    
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: "Authorization denied" });
    }
    const isBlackListed = await blackListTokenModel.findOne({ token: token });
    if (isBlackListed) {
        return res.status(401).json({ message: "Authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SecretKey);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: "Authorization denied" });
        }
        req.captain = captain;
        next();
    }
    catch (error) {
        console.log(error);
        
        return res.status(401).json({ message: "Authorization denied" });
    } 
}
// export default {authUser,authCaptain};