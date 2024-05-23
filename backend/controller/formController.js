const Form = require("../model/formModel");

const submitForm = async (req, res) => {
    try {
        const { totalPrice, bank, rekening } = req.body;

        // Validasi input
        if (!totalPrice || !bank || !rekening) {
            return res.status(400).json({ error: "Semua field harus diisi" });
        }

        // Menambahkan ID pengguna dari token
        const userId = req.user._id;

        // console.log("User data from token:", { userId, firstName, lastName });
        console.log(req.user)

        // Buat dan simpan dokumen baru ke database
        const newForm = await Form.create({
            totalPrice,
            bank,
            rekening,
            userId,
        });

        // Berikan respon berhasil
        res.status(201).json({ message: "Form berhasil disubmit", data: newForm });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllForms = async (req, res) => {
    try {
        // Fetch all form data from the database
        const forms = await Form.find();

        // If no forms found, return a 404 status code
        if (!forms || forms.length === 0) {
            return res.status(404).json({ message: "No forms found" });
        }

        // Send the list of forms as a response
        res.status(200).json(forms);
    } catch (error) {
        // Handle database or server errors
        console.error("Error fetching forms:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    submitForm, getAllForms
};
