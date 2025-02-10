const express = require('express');
const contactRoutes = require('./routes/contact');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const jobsRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const Job = require('./models/job.model');
const applicationsRoutes = require('./routes/applications');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/jobdb'; // Use the correct database name

app.use(cors());
app.use(express.json());  // Use express.json() to parse JSON bodies

// Serve static files (if you have frontend files like HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Define routes
app.use('/api/jobs', jobsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationsRoutes);

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Fetch and log job entries to verify data
    Job.find().then(jobs => {
      console.log('Existing job entries:', jobs);
    }).catch(err => {
      console.error('Error fetching job entries:', err);
    });

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT secret for debugging
// Start the server after successful connection to MongoDB

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
