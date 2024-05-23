const mongoose = require("mongoose");

const eduSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    },
}, { collection: "education" });

const Education = mongoose.model("Education", eduSchema);

module.exports = Education;
