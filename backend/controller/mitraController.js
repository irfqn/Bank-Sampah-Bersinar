const Mitra = require("../model/mitraModel");

exports.pendataan = async (req, res) => {
    const { name, nominal, date, phone, address, email } = req.body;

    try {
        const mitra = await Mitra.pendataan({ name, nominal, date, phone, address, email });

        res.status(200).json(mitra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.mitra = async (req, res) => {
    try {
        const data = await Mitra.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.findMitraByName = async (req, res) => {
    try {
        const { name } = req.query
        const mitra = await Mitra.find({ name: { $regex: name, $options: "i" } })
        res.json(mitra)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
