const mongoose = require('mongoose');

const totalPriceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalHarga: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "total" });

const TotalPrice = mongoose.model('TotalPrice', totalPriceSchema);

module.exports = TotalPrice;
