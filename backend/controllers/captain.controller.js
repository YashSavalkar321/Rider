const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });

    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({
        token,
        captain
    });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = captain.generateAuthToken();
    
    res.cookie('token', token );

    res.status(200).json({token, captain });

}

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain; // From authCaptain middleware    
    // if (!captain) {
    //     return res.status(404).json({ message: 'Captain not found' });
    // }
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Add the token to the blocklist
    await blacklistTokenModel.create({token});

    res.clearCookie('token'); // Clear the cookie
    res.status(200).json({ message: 'Logged out successfully' });
}