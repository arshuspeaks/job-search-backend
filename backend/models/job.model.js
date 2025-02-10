// backend/models/job.model.js

const mongoose = require('mongoose');

// Define the job schema (what a job listing should contain)
const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },

  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model so we can use it in other files
module.exports = mongoose.model('Job', jobSchema);
