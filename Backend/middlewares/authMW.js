import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken"
const JWT_SecretKey="yatin2104";
// import cookieParser from "cookie-parser"; 


const authUser = async (req, res, next) => { 
   
    console.log(req.cookies);   
    const token = (req.cookies && req.cookies.token) || (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[1]);  
    if (!token) {
        console.log("No token found");
         return res.status(401).json({ message: "Authorization denied" });
    }
    const isBlackListed = await userModel.findOne({ token: token });
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
export default authUser;