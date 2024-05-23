const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    totalPrice: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    rekening: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Menyimpan ID pengguna
        ref: 'User', // Mengacu pada model pengguna
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: "form" })

const Form = mongoose.model("Form", formSchema)

module.exports = Form
