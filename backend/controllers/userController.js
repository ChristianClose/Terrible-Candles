import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const DAYS = 1;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;
const maxAgeInMilliseconds = (DAYS * HOURS_IN_DAY) * (MINUTES_IN_HOUR * SECONDS_IN_MINUTE) * MILLISECONDS_IN_SECOND;

//CREATE
export const createUser = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ $or: [{ username: req.body.username}, {email: req.body.email }] });
        if (!foundUser) {
            req.body.isAdmin = false;
            const user = await User.create(req.body);
            const {_id, username, email, firstName, lastName} = user

            res.cookie("token", generateToken(user._id), { maxAge: maxAgeInMilliseconds, httpOnly: true, sameSite: true });
            res.cookie("auth", generateToken(user._id), { maxAge: maxAgeInMilliseconds, sameSite: true });
            
            res.status(201).json({ message: "User successfully created", 
            user: {
                _id,
                username,
                email,
                firstName,
                lastName

            }});
        } else {
            throw new Error("Username or email already exists!");
        }

    } catch (error) {
        error.statusCode = 409;
        next(error);
    }
};
//READ
export const authUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const validPassword = await user.comparePassword(req.body.password);
        if (validPassword) {
            res.cookie("token", generateToken(user._id), { maxAge: maxAgeInMilliseconds, httpOnly: true, sameSite: true });
            res.cookie("auth", generateToken(user._id), { maxAge: maxAgeInMilliseconds, sameSite: true });
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
    if(!req.cookies.token || !req.cookies.auth){
        res.status(401).end();
    } else {
        const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const decodedAuth = jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -createdAt -updatedAt -__v");
        if(user && decodedAuth){
            res.send(user)
        } else {
            res.status(401).end();
        }
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(!user){
            throw new Error("User not found!")
        }
        res.status(200).json(user);
    } catch (error) {
        error.statusCode = 400;
        console.log(error)
        next(error)
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password");
        if(!users){
            throw new Error("Users not found!")
        }
        res.status(200).json(users);
    } catch (error) {
        error.statusCode = 400;
        console.log(error)
        next(error)
    }
};

//UPDATE
export const updateUser = async (req, res, next) => {
    try {
        if(req.body.password){
            if(req.body.password !== req.body.confirmPassword){
                throw new Error("Passwords do not match");
            }
        } else {
            delete req.body.password
            delete req.body.confirmPassword
        }
        const user = await User.findByIdAndUpdate(req.body._id, req.body, { new: true }).select("-password -createdAt -updatedAt -__v");
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        next(error)
    }
};

//DELETE
export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Successfully deleted user id" + deletedUser._id})
    } catch(error){
        next(error);
    }
}