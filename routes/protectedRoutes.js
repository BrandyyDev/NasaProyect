const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/protected', authenticateToken, authController.getProtectedData);

module.exports = router;