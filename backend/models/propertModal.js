const mongoose = require('mongoose');

const propertySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a property title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    type: {
      type: String,
      enum: ['rent', 'sale'],
      required: true,
    },
    category: {
      type: String,
      enum: ['house', 'land', 'commercial'],
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    // --- NEW FIELDS ---
    bedrooms: {
      type: Number,
      required: false, // Optional because "Land" doesn't have bedrooms
    },
    bathrooms: {
      type: Number,
      required: false, // Optional because "Land" might not have bathrooms
    },
    area: {
      type: Number, // Square meters (important for Land)
      required: false,
    },
    amenities: {
      type: [String], // e.g., ["Wifi", "Water Tank", "Parking", "Security"]
      required: false,
    },
    // ------------------
    images: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length >= 3;
        },
        message: 'You must upload at least 3 images.',
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Property', propertySchema);