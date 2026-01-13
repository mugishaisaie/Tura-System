const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// When someone sends a POST request to '/', run the registerUser function
router.post('/', registerUser);

module.exports = router;