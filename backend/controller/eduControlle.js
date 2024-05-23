const Education = require("../model/eduModel")

exports.education = async (req, res) => {
    const { picture, title, article } = req.body

    try {
        if (!picture || !title || !article) {
            throw new Error("All fields are required")
        }

        const education = await Education.create({ picture, title, article });

        res.status(200).json(education)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.getAlleducation = async (req, res) => {
    try {
        const data = await Education.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}