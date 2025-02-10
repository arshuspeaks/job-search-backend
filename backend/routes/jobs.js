const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// GET /api/jobs - Fetch all job listings
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/jobs/:id - Fetch job details by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        return res.status(401).send('User not logged in');
    }
    

    // Check if user is logged in
    if (!req.user) {
        return res.status(401).send('User not logged in');
    }
    

    const job = new Job({
        userId: req.user._id, // Link job to the logged-in user
