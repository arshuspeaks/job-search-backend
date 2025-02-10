const express = require('express');
const Application = require('../models/application.model'); // Import the application model
const Job = require('../models/job.model'); // Import the job model
const router = express.Router();

// Handle POST request to submit applications
router.post('/apply', async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        return res.status(401).send('User not logged in');
    }
    
    const { name, email, jobId } = req.body;

    // Validate input
    if (!name || !email || !jobId) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Find the job using jobId
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send('Job not found');
        }

        // Create a new application linked to the user
        const newApplication = new Application({
            name,
            email,
            jobId,
            userId: req.user._id // Link application to the logged-in user
        });

        // Save the application to the database
        await newApplication.save();

        res.status(200).send('Application submitted successfully!');
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).send('Error submitting application');
    }
});

// New route for retrieving all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error retrieving applications:', error);
        res.status(500).send('Error retrieving applications');
    }
});

module.exports = router;
