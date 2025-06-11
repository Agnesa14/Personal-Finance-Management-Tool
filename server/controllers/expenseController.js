const Expense = require('../models/Expense');
// Shto shpenzim
exports.addExpense = async (req, res) => {
  const { userId, description, amount, date, category } = req.body;
  if (!userId || !description || !amount || !date || !category) {
    return res.status(400).json({
      message: 'Ju lutem plotësoni të gjitha fushat.'
    });
  }
  try {
    const expense = new Expense({ userId, description, amount, date, category });
    await expense.save();
    res.status(201).json({ message: 'Shpenzimi u shtua me sukses!', expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gabim gjatë shtimit të shpenzimit.' });
  }
};
// Merr të gjitha shpenzimet për një përdorues
exports.getExpenses = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'UserId mungon.' });
  }
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gabim gjatë marrjes së shpenzimeve.' });
  }
};
// Përditëso shpenzim
exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({
      message: 'Shpenzimi nuk u gjet.'
    });
    res.json({ message: 'Shpenzimi u përditësua.', expense: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim gjatë përditësimit të shpenzimit.' });
  }
};
// Fshij shpenzim
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({
      message: 'Shpenzimi nuk u gjet.'
    });
    res.json({ message: 'Shpenzimi u fshi me sukses.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim gjatë fshirjes së shpenzimit.' });
  }
};