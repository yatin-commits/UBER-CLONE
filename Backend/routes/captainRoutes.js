import express from "express";
const router = express.Router();
import { body } from "express-validator";
import  { registerCaptain, loginCaptain,logoutCaptain,getCaptainProfile } from "../middlewares/captainMW.js";
// import captainMW from "../middlewares/captainMW.js";
// import authMW from "../middlewares/authMW.js";
import {authCaptain} from "../middlewares/authMW.js";
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First Name should be at least 3 characters long'),
    body('vehicle.colour').isLength({ min: 3 }).withMessage('Colour should be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate should be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity should be at least 1'),
    body('vehicle.vehicleType').isIn(['bike', 'car', 'auto']).withMessage('Invalid Vehicle Type'),
], registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
], loginCaptain);


router.get('/profile',authCaptain,getCaptainProfile);

router.get('/logout',authCaptain,logoutCaptain);
export default router;
