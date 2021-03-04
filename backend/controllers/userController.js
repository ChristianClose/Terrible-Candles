import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const createUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ $or: [{ username: req.body.username, email: req.body.email }] });
        if (!foundUser) {
            await User.create(req.body);
            res.status(201).json({ message: "User successfully created" });
        } else {
            res.status(409).json({ error: "Username or email already exists!" });
        }

    } catch (error) {
        res.status(400).json({ error });
    }
};

export const authUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ username: req.body.username });
        const validPassword = await user.comparePassword(req.body.password);
        if (validPassword) {
            const DAYS = 1;
            const HOURS_IN_DAY = 24;
            const MINUTES_IN_HOUR = 60;
            const SECONDS_IN_MINUTE = 60;
            const MILLISECONDS_IN_SECOND = 1000;
            const maxAgeInMilliseconds = (DAYS * HOURS_IN_DAY) * (MINUTES_IN_HOUR * SECONDS_IN_MINUTE) * MILLISECONDS_IN_SECOND;

            res.cookie("token", generateToken(user._id), { maxAge: maxAgeInMilliseconds, httpOnly: true, sameSite: true });
            res.json({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            });
        } else {
            const error = new Error("Invalid username or password");
            error.statusCode = 401;
            error.name = "Invalid credentials";
            next(error);
        }
    } catch (error) {
        error = new Error("Username was not found");
        error.statusCode = 400;
        next(error);
    }
};

export const authUserByToken = async(req, res, next) => {
    if(!req.cookies.token){
        res.status(401).end();
    } else {
        const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -createdAt -updatedAt -__v");
        if(user){
            res.send(user)
        } else {
            res.status(401).end();
        }
    }


}


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.body._id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: "User was not found" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, req.body, { new: true }).select("-password -createdAt -updatedAt -__v");
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }


};
