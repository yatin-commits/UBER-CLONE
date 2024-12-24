import captainModel from "../models/captain.model.js";


const createCaptain=async(
    {
        firstname,
        lastname,
        email,
        password,
        colour,
        plate,
        capacity,
        vehicleType})=>
        {
             if(!firstname || !lastname || !email || !password || !colour || !plate || !capacity || !vehicleType)
             {
                 throw new Error("All fields are required");
             }
                const captain = await captainModel.create({
                    fullname:{
                        firstname,
                    lastname},
                    email,  
                    password,
                    vehicle:{
                        colour,
                        plate,
                        capacity,
                        vehicleType
                    }
                });
        }


export default {createCaptain};