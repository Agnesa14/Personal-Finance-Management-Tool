const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

router.get('/summary', budgetController.getBudgetWithExpenses);
router.get('/', budgetController.getBudgetByUser);
router.post('/', budgetController.createBudget);
router.put('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);

module.exports = router;