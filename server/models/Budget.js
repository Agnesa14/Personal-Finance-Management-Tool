const mongoose = require('mongoose');
const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true },
  totalLimit: { type: Number, required: true }
});
module.exports = mongoose.model('Budget', budgetSchema);