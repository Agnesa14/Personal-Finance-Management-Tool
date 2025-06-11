const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'userId mungon.' });

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së njoftimeve.' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë përditësimit të statusit lexuar.' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Njoftimi u fshi.', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së njoftimit.' });
  }
};
