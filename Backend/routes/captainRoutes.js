import express from "express";
const router = express.Router();
import {body} from "express-validator";
import captainMW from "../middlewares/captainMW.js";

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters long'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name should be at least 3 characters long'),
    body('vehicle.colour').isLength({min:3}).withMessage('Colour should be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity should be at least 1'),
    body('vehicle.vehicleType').isIn(['bike','car','auto']).withMessage('Invalid Vehicle Type'),],
    captainMW.registerCaptain
)





export default router;
