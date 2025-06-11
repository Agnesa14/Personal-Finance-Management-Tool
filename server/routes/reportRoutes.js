const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController'); // ✅ Kontrollo path-in

// Rregullo këto rreshta:
router.get('/summary', reportController.getMonthlySummary);
router.get('/categories', reportController.getExpensesByCategory);

module.exports = router;
