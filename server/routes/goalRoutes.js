const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goalController');
router.post('/', goalController.createGoal);
router.get('/', goalController.getGoalsByUser);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);
module.exports = router;