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

// POST /api/jobs - Create a new job listing
router.post('/', async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        return res.status(401).send('User not logged in');
    }

    const job = new Job({
        userId: req.user._id, // Link job to the logged-in user
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        description: req.body.description
    });

    try {
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/jobs/:id - Update a job listing by ID
router.put('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        job.title = req.body.title;
        job.company = req.body.company;
        job.location = req.body.location;
        job.description = req.body.description;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/jobs/:id - Delete a job listing by ID
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        await job.remove();
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
