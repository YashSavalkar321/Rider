const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authenticateUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Check if the token is blacklisted
    const blacklisted = await blacklistTokenModel.findOne({ token: token });

    if (blacklisted) {
        return res.status(403).json({ message: 'Token is blacklisted. Please log in again.' });
    }

    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = user; // Attach user to request object
        next(); // Call the next middleware or route handler
    }catch (error) {
        console.error('Authentication error:', error);
        return res.status(400).json({ message: 'Invalid token.' });
    }
}


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Check if the token is blacklisted
    const blacklisted = await blacklistTokenModel.findOne({ token: token });

    if (blacklisted) {
        return res.status(403).json({ message: 'Token is blacklisted. Please log in again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);

        if (!captain) {
            return res.status(404).json({ message: 'Captain not found.' });
        }

        req.captain = captain; // Attach captain to request object
        return next(); // Call the next middleware or route handler
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(400).json({ message: 'Invalid token.' });
    }
}