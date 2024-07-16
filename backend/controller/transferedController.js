const Transfered = require("../model/transferedModel")

exports.submitTransfered = async (req, res) => {
    const { userId, action, transferedPict } = req.body

    try {
        if (!userId || !action || !transferedPict) {
            throw new Error("All fields are required");
        }

        const transfer = await Transfered.create({ userId, transferedPict });

        res.status(200).json(transfer);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

exports.getTransferedPictByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const transfer = await Transfered.findOne({ userId });
        if (!transfer) {
            return res.status(404).json({ message: "Transfered record not found" });
        }

        res.status(200).json(transfer.transferedPict);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};