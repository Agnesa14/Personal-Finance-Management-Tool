const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Income = require('../models/Income');

// ✅ 1. Përmbledhje mujore e të ardhurave dhe shpenzimeve
exports.getMonthlySummary = async (req, res) => {
  const { userId, year = new Date().getFullYear() } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'Parametri userId mungon.' });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const start = new Date(`${year}-01-01T00:00:00Z`);
    const end = new Date(`${Number(year) + 1}-01-01T00:00:00Z`);

    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      }
    ]);

    const incomes = await Income.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: { $month: '$date' },
          total: { $sum: '$amount' }
        }
      }
    ]);

    const result = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0
    }));

    incomes.forEach(item => {
      result[item._id - 1].income = item.total;
    });

    expenses.forEach(item => {
      result[item._id - 1].expense = item.total;
    });

    res.status(200).json(result);
  } catch (err) {
    console.error('Gabim në përmbledhjen mujore:', err);
    res.status(500).json({ message: 'Gabim gjatë përpilimit të përmbledhjes mujore.' });
  }
};

// ✅ 2. Shpenzimet sipas kategorive (për Pie Chart)
exports.getExpensesByCategory = async (req, res) => {
  const { userId, from, to } = req.query;

  if (!userId || !from || !to) {
    return res.status(400).json({
      message: 'Parametrat mungojnë: userId, from, to.'
    });
  }

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const startDate = new Date(from);
    const endDate = new Date(to);

    const result = await Expense.aggregate([
      {
        $match: {
          userId: userObjectId,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      {
        $project: {
          category: '$_id',
          total: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error('Gabim gjatë analizës sipas kategorive:', err);
    res.status(500).json({ message: 'Gabim gjatë analizës sipas kategorive.' });
  }
};
