// backend/routes/applications.js

const express = require('express');
const Application = require('../models/application.model'); // Import the application model
const Job = require('../models/job.model'); // Import the job model
const router = express.Router();

router.post('/apply', async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        return res.status(401).send('User not logged in');
    }
    
    const { name, email, jobId } = req.body;

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
