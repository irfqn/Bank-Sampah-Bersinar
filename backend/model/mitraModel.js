const mongoose = require("mongoose");
const validator = require("validator");

const mitraSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nominal: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, { collection: 'mitra' })

mitraSchema.statics.pendataan = async function ({ name, nominal, date, phone, address, email }) {
    if (!name || !nominal || !date || !phone || !address || !email) {
        throw Error("All fields are required")
    }

    if (!validator.isEmail(email)) {
        throw Error("The email is not valid")
    }

    const mitra = await this.create({ name, nominal, date, phone, address, email })

    return mitra
}

module.exports = mongoose.model("Mitra", mitraSchema)

