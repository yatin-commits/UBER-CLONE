import mongoose from 'mongoose'
import dotenv from'dotenv'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config();

const connectToDb = () => {
    mongoose.connect("mongodb+srv://yatin2104:yatin2104@ubercluster.w1ifq.mongodb.net/")
        .then(() => {
            console.log("Connected to DB!");
        })
        .catch((err) => {
            console.error("Failed to connect to DB:", err);
        });
};

export default connectToDb;