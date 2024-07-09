const TotalPrice = require("../model/totalModel");

// Function to create total price entry
exports.createTotalPrice = async (req, res) => {
    try {
        const { totalHarga, detectedClasses } = req.body;
        const userId = req.user._id;

        // Debugging: log the incoming data
        console.log('Received data:', { totalHarga, detectedClasses });

        if (!totalHarga || !detectedClasses || !Array.isArray(detectedClasses)) {
            return res.status(400).json({ error: "Total harga and detected classes are required and must be an array" });
        }

        const totalPrice = await TotalPrice.create({ user: userId, totalHarga, trashClass: detectedClasses });

        res.status(201).json(totalPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get total price entries for a user
exports.getTotalPrice = async (req, res) => {
    try {
        const userId = req.user._id; // Dapatkan ID pengguna dari token otentikasi
        // Cari semua data total harga berdasarkan ID pengguna
        const totalPrice = await TotalPrice.find({ user: userId });

        if (!totalPrice || totalPrice.length === 0) {
            return res.status(404).json({ error: "Total price not found for this user" });
        }

        res.status(200).json(totalPrice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to reset trashClass array and totalHarga for a user
exports.resetTrashClassAndTotalHarga = async (req, res) => {
    try {
        const { userId } = req.params;

        // Update all total price entries for the user, setting trashClass to empty and totalHarga to 0
        const result = await TotalPrice.updateMany({ user: userId }, { $set: { trashClass: [], totalHarga: 0 } });

        if (result.nModified > 0) {
            console.log('Trash class and total price reset successfully');
            res.status(200).json({ message: 'Trash class and total price reset successfully' });
        } else {
            console.log('No entries found to update');
            res.status(404).json({ message: 'No entries found to update' });
        }
    } catch (error) {
        console.error('Error resetting trash class and total price:', error);
        res.status(500).json({ error: error.message });
    }
};
