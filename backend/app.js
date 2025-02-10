const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path module

// Initialize app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Job schema and model
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
});

const Job = mongoose.model('Job', jobSchema);

// Job listing API endpoint
app.get('/api/jobs', async (req, res) => {
    const searchQuery = req.query.search; // Fetch search query from URL params
    try {
        let jobs;
        if (searchQuery) {
            // If there is a search query, filter the jobs
            jobs = await Job.find({
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for job title
                    { company: { $regex: searchQuery, $options: 'i' } }  // Case-insensitive search for company
                ]
            });
        } else {
            jobs = await Job.find(); // Fetch all jobs if no search query is provided
        }
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

const authRoutes = require('./routes/auth'); // Import authentication routes
const applicationsRoutes = require('./routes/applications'); // Import applications routes

// Middleware
app.use('/api/applications', applicationsRoutes); // Register applications routes
app.use('/api/auth', authRoutes); // Register authentication routes

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
