const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
    preferredCurrency: { type: String, default: 'EUR' },
    timezone: { type: String, default: 'Europe/Prague' }, // zëvendëso me timezone default
    notificationsEnabled: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
    // Për email/password - do përdoret user model për email dhe fjalëkalim.
    // Këtu mund të ruash opsione si 'emailVerified', 'twoFactorAuth' etj nëse dëshiron.
}, { timestamps: true });

module.exports = mongoose.model('UserSettings', userSettingsSchema);