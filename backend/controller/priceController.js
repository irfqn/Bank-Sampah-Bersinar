// const Price = require("../model/priceModel")

// exports.harga = async (req, res) => {
//     const { trash, month, price } = req.body

//     try {
//         const parsedDate = new Date(month);
//         if (isNaN(parsedDate.getTime())) {
//             throw new Error("Invalid date format for month");
//         }

//         const harga = await Price.harga({ trash, month: parsedDate, price });

//         res.status(200).json(harga)
//     } catch (error) {
//         res.status(400) / json({
//             error: error.message
//         })
//     }
// }

// exports.getPriceByMonth = async (req, res) => {
//     const { month } = req.query

//     try {
//         const startDate = new Date(month);
//         const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Mendapatkan tanggal terakhir dari bulan

//         const prices = await Price.find({
//             month: { $gte: startDate, $lte: endDate }
//         });

//         if (!prices || prices.length === 0) {
//             return res.status(404).json({ error: "Data not found" })
//         }

//         res.status(200).json(prices)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

// priceController.js
const Price = require("../model/priceModel");

exports.harga = async (req, res) => {
    const { trash, month, price } = req.body;

    try {
        // Validasi input
        if (!trash || !month || !price) {
            throw new Error("All fields are required");
        }

        const parsedDate = new Date(month);
        if (isNaN(parsedDate.getTime())) {
            throw new Error("Invalid date format for month");
        }

        const harga = await Price.harga({ trash, month: parsedDate, price });

        res.status(200).json(harga);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getPriceByMonth = async (req, res) => {
    const { month } = req.query;

    try {
        // Validasi input
        if (!month) {
            throw new Error("Month is required");
        }

        const startDate = new Date(month);
        if (isNaN(startDate.getTime())) {
            throw new Error("Invalid date format for month");
        }
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Mendapatkan tanggal terakhir dari bulan

        const prices = await Price.find({
            month: { $gte: startDate, $lte: endDate }
        });

        if (!prices || prices.length === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.status(200).json(prices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
