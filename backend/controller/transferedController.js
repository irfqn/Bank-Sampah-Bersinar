const Transfered = require("../model/transferedModel");

exports.submitTransfered = async (req, res) => {
    const { userId, transferedPict } = req.body;

    try {
        if (!userId || !transferedPict) {
            throw new Error("All fields are required");
        }

        const transfer = await Transfered.create({ userId, transferedPict });

        res.status(200).json(transfer);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getTransferedPictByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const transfers = await Transfered.find({ userId });
        if (!transfers || transfers.length === 0) {
            return res.status(404).json({ message: "Transfered records not found" });
        }

        // Return all pictures as array
        res.status(200).json(transfers.map(transfer => transfer.transferedPict));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
