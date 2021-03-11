import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    const { token, auth } = req.cookies;
    if (token && auth) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const decodedAuth = jwt.verify(auth, process.env.JWT_SECRET);

            req.user = await User.findById(decodedToken.id).select('-password');
            
            if(req.user && decodedAuth){
                next();
            } else {
                throw new Error("Not authorized, both tokens failed ")
            }
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token found' });
    }
};