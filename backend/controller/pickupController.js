const Pickup = require('../model/pickupModel');

const getAllPickups = async (req, res) => {
    try {
        const pickups = await Pickup.find();
        res.status(200).json(pickups);
    } catch (error) {
        console.error("Error fetching pickups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updatePickupStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const pickup = await Pickup.findById(id);

        if (!pickup) {
            return res.status(404).json({ error: "Pickup not found" });
        }

        console.log(`Updating status for pickup ID: ${id} to ${status}`);
        pickup.status = status;
        await pickup.save();

        console.log("Updated pickup:", pickup);
        res.status(200).json({ message: "Status updated successfully", data: pickup });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getPickUpById = async (req, res) => {
    try {
        const userId = req.user._id
        const pickupId = await Pickup.find({ userId })
        res.status(200).json(pickupId)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAllPickups,
    updatePickupStatus,
    getPickUpById
};
