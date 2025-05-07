const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Ky email është i regjistruar tashmë.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Regjistrimi u krye me sukses.' });
  } catch (err) {
    console.error('Gabim gjatë regjistrimit:', err);
    res.status(500).json({ message: 'Ndodhi një gabim në server gjatë regjistrimit.' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'Nuk u gjet asnjë përdorues me këtë email.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Email ose fjalëkalim i pasaktë.' });

    const token = jwt.sign({ userId: user._id }, 'sekret_jwt', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Gabim gjatë kyçjes:', err);
    res.status(500).json({ message: 'Ndodhi një gabim në server gjatë kyçjes.' });
  }
};

// FORGOT PASSWORD (Reset)
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'Nuk u gjet asnjë përdorues me këtë email.' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Fjalëkalimi u rivendos me sukses.' });
  } catch (err) {
    console.error('Gabim gjatë rivendosjes së fjalëkalimit:', err);
    res.status(500).json({ message: 'Ndodhi një gabim në server gjatë rivendosjes së fjalëkalimit.' });
  }
};
