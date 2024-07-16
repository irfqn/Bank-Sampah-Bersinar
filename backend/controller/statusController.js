const Transaction = require('../model/statusModel');

// Fungsi untuk membuat transaksi baru
exports.createTransaction = async (req, res) => {
    try {
        const { firstName, lastName, rekening, nik, totalPrice, action, userId } = req.body;

        // Validasi input
        if (!firstName || !lastName || !rekening || !nik || !totalPrice || !action || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTransaction = new Transaction({
            firstName,
            lastName,
            rekening,
            nik,
            totalPrice,
            action,
            userId
        });

        await newTransaction.save();
        res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Failed to create transaction', error: error.message });
    }
};

// Fungsi untuk mengambil semua transaksi
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
};

// Fungsi untuk mengambil semua transaksi berdasarkan userId
exports.getTransactionsByUserId = async (req, res) => {
    try {
        const userId = req.user._id; // Mengambil userId dari token yang sudah diverifikasi oleh middleware
        console.log("User ID from token:", userId);

        const transactions = await Transaction.find({ userId });
        console.log("Transactions found:", transactions);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
};

