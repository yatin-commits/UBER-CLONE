import captainModel from "../models/captain.model.js";
import captainServices from "../services/captainServices.js";
import blackListTokenModel from "../models/blackListToken.model.js";
import { validationResult } from "express-validator";
const JWT_SecretKey="yatin2104";
export const registerCaptain = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        // Check if captain already exists
        const isCaptainAlreadyExist = await captainModel.findOne({ email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ error: "Captain already exists" });
        }

        // Hash password
        const hashPassword = await captainModel.hashPassword(password);

        // Create captain
        const captain = await captainServices.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            colour: vehicle.colour,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });

        // Generate token
        const token = captain.generateAuthToken();
        res.status(201).json({ token, captain });
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};

export const loginCaptain = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { email, password } = req.body;

        // Find captain by email
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(400).json({ error: "Captain not found" });
        }

        // Compare passwords
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate token
        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token, captain });
    } catch (err) {
        next(err); // Pass the error to the global error handler
    }
};

export const getCaptainProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.captain);
    } catch (err) {
        next(err);
    }
};

export const logoutCaptain = async (req, res, next) => {
    try {
        res.clearCookie("token");

        const token =
            (req.cookies && req.cookies.token) ||
            (req.headers &&
                req.headers.authorization &&
                req.headers.authorization.split(" ")[1]);

        if (!token) {
            return res.status(400).json({ error: "Token not found" });
        }

        // Add token to blacklist
        await blackListTokenModel.create({ token });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};
