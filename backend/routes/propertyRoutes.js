const express = require('express');
const router = express.Router();
const { getProperties, createProperty } = require('../controllers/propertyControllers');
const { protect } = require('../middleware/authMiddleware');

// Clean way to handle both GET and POST on the same link
router.route('/')
  .get(getProperties)                 // Public: Anyone can see houses
  .post(protect, createProperty);     // Private: Only logged-in users can post

module.exports = router;