const Income = require('../models/Income');
exports.addIncome = async (req, res) => {
  try {
    const { userId, source, amount, category, date, description } = req.body;
    if (!userId || !source || !amount || !date) {
      return res.status(400).json({
        message: 'Ju lutem plotësoni të gjitha fushat.'
      });
    }

    const income = new Income({
      userId,
      name: source, // e ruajmë si "name" në DB, por marrim nga "source"
      amount,
      category,
      date,
      description
    });

    await income.save();
    res.status(201).json({ message: 'Të ardhurat u shtuan me sukses!', income });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim gjatë shtimit të të ardhurave.' });
  }
};


exports.getIncomes = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'UserId mungon.' });
        }
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gabim gjatë marrjes së të ardhurave.' });
    }
};

// Përditëso të ardhurat
exports.updateIncome = async (req, res) => {
    try {
        const updated = await Income.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updated) return res.status(404).json({
            message: 'Të ardhurat nuk u gjetën.'
        });
        res.json({ message: 'Të ardhurat u përditësuan.', income: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Gabim gjatë përditësimit të të ardhurave.'
        });
    }
};
// Fshij të ardhurat
exports.deleteIncome = async (req, res) => {
    try {
        const deleted = await Income.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({
            message: 'Të ardhurat nuk u gjetën.'
        });
        res.json({ message: 'Të ardhurat u fshinë me sukses.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gabim gjatë fshirjes së të ardhurave.' });
    }
};