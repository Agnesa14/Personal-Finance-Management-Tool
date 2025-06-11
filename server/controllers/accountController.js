const Account = require('../models/Account');

exports.createAccount = async (req, res) => {
  const { userId, name, balance } = req.body;
  if (!userId || !name) return res.status(400).json({ message: 'Fushat mungojnë.' });
  try {
    const account = new Account({ userId, name, balance });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë krijimit të llogarisë.' });
  }
};

exports.getAccounts = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'userId mungon.' });
  try {
    const accounts = await Account.find({ userId });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së llogarive.' });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!account) return res.status(404).json({ message: 'Llogaria nuk u gjet.' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë përditësimit të llogarisë.' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Llogaria nuk u gjet.' });
    res.json({ message: 'Llogaria u fshi me sukses.' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së llogarisë.' });
  }
};