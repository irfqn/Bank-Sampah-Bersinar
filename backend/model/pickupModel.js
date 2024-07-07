const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        default: "pending", // Set default value to "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { collection: "pickup" });

const Pickup = mongoose.model("Pickup", pickupSchema);

module.exports = Pickup;
