import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';  // Import jwt
import bcrypt from 'bcryptjs';
const JWT_SecretKey="yatin2104";


const userSchema=new mongoose.Schema(
    {
        fullname:{
            firstName:{
                type:String,
                required:true,
                minLength:[3,'First name must be 3 character long']
                 
            },
            lastName:{
                type:String,
                minLength:[3,'Last name must be 3 character long']
                 
            }
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            minLength:[5,"Email must be 5 charater long"]

        },
        password:
        {
            type:String,
            required:true,
            select:false
        },
        socketId:
        {
            type:String
        }
    }
)
userSchema.methods.generateAuthToken=function()
{
    const token = jwt.sign({_id:this.id},JWT_SecretKey);
    return token;
}

userSchema.methods.comparePassword=async function (password)
{
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function (password)
{
    return await bcrypt.hash(password,10);
}


const userModel= mongoose.model('User',userSchema);

export default userModel;