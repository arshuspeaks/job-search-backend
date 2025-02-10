const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model'); // Import the contact model

// POST /api/contact - Handle contact form submissions
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Create a new contact message
        const newContact = new Contact({
            name,
            email,
            message
        });

        // Save the contact message to the database
        await newContact.save();

        res.status(201).send('Message received successfully!');
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).send('Error saving message');
    }
});



module.exports = router;
