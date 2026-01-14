const express = require('express');
const router = express.Router();
const { registerUser,loginUser,getMe } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware'); // <--- Import Guard

// When someone sends a POST request to '/', run the registerUser function
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // <--- Add 'protect' as the second argument
module.exports = router;