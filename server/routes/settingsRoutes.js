const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settingsController');
// Merr preferencat e përdoruesit
router.get('/:userId', settingsController.getSettings);
// Përditëson preferencat e përdoruesit
router.put('/:userId', settingsController.updateSettings);
module.exports = router;