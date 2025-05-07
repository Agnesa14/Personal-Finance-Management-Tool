const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { resetPassword } = require('../controllers/authController');
router.post('/reset-password', resetPassword);


// Rruga për regjistrim
router.post('/register', register);

// Rruga për login
router.post('/login', login);

module.exports = router;
