const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['employer', 'job_seeker'],
        default: 'job_seeker' // Default role is job seeker
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
