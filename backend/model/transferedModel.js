const mongoose = require("mongoose")

const transferedSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    transferedPict: {
        type: String,

    }
}, { collection: "transfered" })

const Transfered = mongoose.model("Transfered", transferedSchema)

module.exports = Transfered