const Transaction = require('../model/statusModel');

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

exports.getAllTransactions = async (req, res) => {
    try {
        // Mendapatkan user ID dari token yang dikirimkan dari frontend
        const userId = req.user._id;

        // Mencari semua transaksi yang terkait dengan user yang sedang login
        const transactions = await Transaction.find({ userId });

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
};
