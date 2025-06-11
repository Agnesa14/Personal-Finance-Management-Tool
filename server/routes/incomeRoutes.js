const express = require('express');
const router = express.Router();
const { addIncome, getIncomes } = require('../controllers/incomeController');
const incomeController = require('../controllers/incomeController');

router.post('/', addIncome);
router.get('/', getIncomes);
router.put('/:id', incomeController.updateIncome);
router.delete('/:id', incomeController.deleteIncome);

module.exports = router;