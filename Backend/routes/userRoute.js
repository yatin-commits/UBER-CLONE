import express from 'express';
const router = express.Router();
// import registerUser from '../middlewares/userMW.js';
// import userMW from '../middlewares/userMW.js'
import { body} from 'express-validator';
import { registerUser, loginUser } from '../middlewares/userMW.js'; 

// console.log(registerUser);   

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstName').isLength({min:3}).withMessage('First name must be 3 character long!'),
    body('password').isLength({min:6}).withMessage('First name must be 3 character long!')
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage('First name must be 3 character long!')
],loginUser)



export default router;