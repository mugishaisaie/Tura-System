const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    role: {
      type: String,
      enum: ['tenant', 'landlord', 'admin'], // We only allow these 3 roles
      default: 'tenant',
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

module.exports = mongoose.model('User', userSchema);