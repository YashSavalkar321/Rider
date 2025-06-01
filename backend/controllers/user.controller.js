const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');  


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ 
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        },
        token
    });

}


module.exports.loginUser = async (req, res, next) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
    
     const { email, password } = req.body;
    
     const user = await userModel.findOne({email}).select('+password');
     // Using select('+password') to include the password field in the query result
     // This is necessary because the password field is usually excluded for security reasons.
     // If you are using Mongoose, you can use the select method to include the password field.


     if (!user) {
          return res.status(404).json({ message: 'User not found' });
     }
    
     const isPasswordValid = await user.comparePassword(password);
     if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
     }
    
     const token = user.generateAuthToken();
        // Assuming generateAuthToken is a method in your user model that generates a JWT token

    res.cookie('token', token);


     res.status(200).json({
          user,
          token
     }); 
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token });
    // Store the token in the blacklist to prevent further access

    
    res.status(200).json({ message: 'Logged out successfully' });
};
