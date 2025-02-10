const jwt = require('jsonwebtoken');

// Middleware to check if the user is logged in
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
