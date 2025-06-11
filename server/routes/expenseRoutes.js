const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const expenseController = require('../controllers/expenseController');

// hiqe /expenses sepse e ke tashmë te app.use('/api/expenses', ...)
router.post('/', addExpense);
router.get('/', getExpenses);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;