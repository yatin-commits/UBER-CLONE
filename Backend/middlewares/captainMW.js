import captainModel from "../models/captain.model.js";
import captainServices from "../services/captainServices.js";
import {validationResult} from "express-validator";

// console.log(validationResult);

const registerCaptain = async (req, res) => {
    // console.log(req.body.fullname.firstname);
    
    
    const error=validationResult(req);
    // console.log("hi");
    
    console.log(error);
    
    if(!error.isEmpty())
    {
        return res.status(400).json({error:error.array()});
    }
    const {fullname,email,password,colour,vehicle}=req.body;
    // console.log(fullname);
    

    const isaCaptainAlreadyExist = await captainModel.findOne({email});
    if(isaCaptainAlreadyExist)
    {
        return res.status(400).json({error:"Captain already exist"});
    }

    const hashPassword=await captainModel.hashPassword(password);
    
    const captain = await captainServices.createCaptain({
        
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        colour:vehicle.colour,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    
    
    const token = captain.generateAuthToken();
    // console.log(token);
    
    res.status(201).json({token,captain});

}; 
export default {registerCaptain};
