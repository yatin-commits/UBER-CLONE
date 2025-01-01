import express from 'express';
const router = express.Router();
// import registerUser from '../middlewares/userMW.js';
// import userMW from '../middlewares/userMW.js'
import { body} from 'express-validator';
import { registerUser, loginUser, getUserProfile,logoutUser} from '../middlewares/userMW.js'; 
import {authUser} from '../middlewares/authMW.js';
// console.log(registerUser);   

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 character long!'),
    body('password').isLength({min:6}).withMessage('First name must be 3 character long!')
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('First name must be 3 character long!')
],loginUser)

router.get('/profile',authUser,getUserProfile)

router.get('/logout',authUser,logoutUser)


export default router;