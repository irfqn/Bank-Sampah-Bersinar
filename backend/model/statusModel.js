const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rekening: {
        type: String,
        required: true
    },
    nik: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "status" });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
