const express = require('express');
const router = express.Router();
const nasaApiController = require('../controllers/nasaController');

router.get('/apod', nasaApiController.getApod);

module.exports = router;