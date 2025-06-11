const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Income', incomeSchema);