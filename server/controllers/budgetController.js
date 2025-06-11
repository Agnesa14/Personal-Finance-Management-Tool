const mongoose = require('mongoose');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const Notification = require('../models/Notification'); // ✅ importo Notification

exports.createBudget = async (req, res) => {
  const { userId, month, totalLimit } = req.body;
  if (!userId || !month || !totalLimit) {
    return res.status(400).json({ message: 'Ju lutem plotësoni të gjitha fushat.' });
  }
  try {
    const existingBudget = await Budget.findOne({ userId, month });
    if (existingBudget) {
      return res.status(400).json({ message: 'Buxheti për këtë muaj tashmë ekziston.' });
    }
    const newBudget = new Budget({ userId, month, totalLimit });
    await newBudget.save();
    res.status(201).json({ message: 'Buxheti u krijua me sukses!', budget: newBudget });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë krijimit të buxhetit.' });
  }
};

exports.getBudgetByUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'UserId mungon në kërkesë.' });
  try {
    const budgets = await Budget.find({ userId });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së buxheteve.' });
  }
};

exports.updateBudget = async (req, res) => {
  const { id } = req.params;
  const { totalLimit } = req.body;
  try {
    const updated = await Budget.findByIdAndUpdate(id, { totalLimit }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Buxheti nuk u gjet.' });
    res.status(200).json({ message: 'Buxheti u përditësua.', updated });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë përditësimit të buxhetit.' });
  }
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Budget.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Buxheti nuk u gjet.' });
    res.status(200).json({ message: 'Buxheti u fshi me sukses.' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së buxhetit.' });
  }
};

exports.getBudgetWithExpenses = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'userId mungon.' });

  try {
    const budgets = await Budget.find({ userId });
    const result = await Promise.all(budgets.map(async (b) => {
      const [monthName, year] = b.month.split(' ');
      const monthIndex = [
        'Janar','Shkurt','Mars','Prill','Maj','Qershor',
        'Korrik','Gusht','Shtator','Tetor','Nëntor','Dhjetor'
      ].indexOf(monthName);

      const from = new Date(year, monthIndex, 1);
      const to = new Date(year, monthIndex + 1, 1);
      const totalSpent = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: { $gte: from, $lt: to }
          }
        },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      const spent = totalSpent[0]?.total || 0;
      const percentage = Math.round((spent / b.totalLimit) * 100);

      // ✅ Kontrollojmë për njoftime të mëparshme për këtë buxhet
      const existingNotifs = await Notification.find({ userId, message: new RegExp(b.month) });

      const sendNotification = async (text) => {
        const exists = existingNotifs.some(n => n.message.includes(text));
        if (!exists) {
          await Notification.create({
            userId,
            message: `📢 ${text} (${b.month})`
          });
        }
      };

      if (percentage >= 80 && percentage < 100) {
        await sendNotification(`Shpenzimet kanë arritur 80% të buxhetit`);
      }
      if (percentage === 100) {
        await sendNotification(`Shpenzimet kanë arritur kufirin e buxhetit`);
      }
      if (percentage > 100) {
        await sendNotification(`⚠️ Ke tejkaluar buxhetin për muajin`);
      }

      return {
        _id: b._id,
        month: b.month,
        totalLimit: b.totalLimit,
        spent,
        percentage
      };
    }));

    res.status(200).json(result.filter(Boolean));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim në përpunimin e të dhënave.' });
  }
};
