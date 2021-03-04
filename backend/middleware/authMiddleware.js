import jwt from "jsonwebtoken";
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodedToken.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token found' });
    }
};