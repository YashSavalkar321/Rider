const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },

        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true,
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        },
    }
});



captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h', // Token expiration time
    });
    return token;
}

captainSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
// This model defines the Captain schema with fields for fullname, email, password, socketId, status, vehicle, and location.
// It includes methods for generating JWT tokens, comparing passwords, and hashing passwords.
// The password field is excluded from queries by default for security reasons.
// The model is exported for use in other parts of the application.
// The captainSchema includes fields for vehicle details and location, with appropriate validation and default values.