const mongoose = require("mongoose")

const priceSchema = new mongoose.Schema({
    trash: {
        type: String,
        required: true
    },
    month: {
        type: Date,
        required: true
    },
    price: {
        type: String,
        required: true
    },
}, { collection: "price" })

priceSchema.statics.harga = async function ({ trash, month, price }) {
    if (!trash || !month || !price) {
        throw Error("All fields are required")
    }

    const harga = await this.create({
        trash, month, price
    })

    return harga
}

module.exports = mongoose.model("Price", priceSchema)