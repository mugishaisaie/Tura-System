const asyncHandler = require('express-async-handler');
const Property = require('../models/propertyModel');
const User = require('../models/userModel');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find();
  res.status(200).json(properties);
});

// @desc    Set/Create a property
// @route   POST /api/properties
// @access  Private (Only Landlords/Admin)
const createProperty = asyncHandler(async (req, res) => {
  // 1. Check if user is authorized (Optional: Check specifically for 'landlord' role)
  /* if (req.user.role !== 'landlord' && req.user.role !== 'admin') {
     res.status(401);
     throw new Error('Only landlords can post properties');
  } 
  */

  // 2. Validate body
  if (!req.body.title || !req.body.price || !req.body.location) {
    res.status(400);
    throw new Error('Please add a title, price, and location');
  }

  // 3. Create property
  const property = await Property.create({
    user: req.user.id, // <--- We get this from the token!
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    category: req.body.category,
    price: req.body.price,
    location: req.body.location,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    amenities: req.body.amenities,
    images: req.body.images, // We will send an array of dummy URLs for now
  });

  res.status(200).json(property);
});

module.exports = {
  getProperties,
  createProperty,
};