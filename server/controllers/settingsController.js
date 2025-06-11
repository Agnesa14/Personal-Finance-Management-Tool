const UserSettings = require('../models/UserSettings');
// Merr preferencat e një përdoruesi
exports.getSettings = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'UserId mungon' });
    try {
        let settings = await UserSettings.findOne({ userId });
        if (!settings) {
            // Krijo preferenca default nëse nuk ekzistojnë
            settings = new UserSettings({ userId });
            await settings.save();
        }
        res.status(200).json(settings);
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Gabim gjatë marrjes së preferencave' });
    }
};
// Përditëso preferencat e përdoruesit
exports.updateSettings = async (req, res) => {
    const { userId } = req.params;
    const { preferredCurrency, timezone, notificationsEnabled, darkMode } =
        req.body;
    if (!userId) return res.status(400).json({ message: 'UserId mungon' });
    try {
        const settings = await UserSettings.findOneAndUpdate(
            { userId },
            { preferredCurrency, timezone, notificationsEnabled, darkMode },
            { new: true, upsert: true }
        );
        res.status(200).json({ message: 'Preferencat u përditësuan', settings });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Gabim gjatë përditësimit të preferencave'
        });
    }
};