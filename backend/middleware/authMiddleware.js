const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Optional wrapper, or use try-catch
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the header starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next middleware/controller
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };