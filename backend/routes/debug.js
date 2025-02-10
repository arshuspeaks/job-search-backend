const express = require('express');
const User = require('../models/user.model'); // Assuming a User model exists for user data

const router = express.Router();

// Temporary route to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
