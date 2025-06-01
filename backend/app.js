const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');

// Connect to the database
connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.use('/api/users', userRoutes);


module.exports = app;
