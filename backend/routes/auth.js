const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');  // Ensure the user model is correctly defined

const router = express.Router();

// POST /api/auth/signup - Register a new user
router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, name, email, password } = req.body;
    console.log("Received signup data:", { username, name, email, password: '******' }); // Mask the password

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password with a salt round of 10

        const user = new User({
            username,
            name,
            email,
            password: hashedPassword,  // Store the hashed password
        });

        const newUser = await user.save();
        console.log("User created successfully:", newUser); // Log the newly created user

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(400).json({ message: 'Error during signup' });
    }
});

// POST /api/auth/login - Authenticate a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });  // Username not found
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });  // Password mismatch
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

module.exports = router;
