import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First Name should be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last Name should be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketid: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle: {
        colour: {
            type: String,
            required: true,
            minlength: [3, "Colour should be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate should be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity should be at least 1"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["bike", "car", "auto"],
        },
        location: {
            lat: {
                type: Number,
                // required: true,
            },
            lng: {
                type: Number,
                // required: true,
            },
        },
    },
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id:this.id},JWT_SecretKey,{expiresIn:'24h'});
        return token;

};
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;
