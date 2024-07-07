const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { login, signup, profile, getAllUsers } = require("../controller/userController");
const { pendataan, mitra, findMitraByName } = require("../controller/mitraController");
const { harga, getPriceByMonth } = require("../controller/priceController");
const { education, getAlleducation } = require("../controller/eduControlle");
const { createTotalPrice, getTotalPrice } = require("../controller/totalController");
const { submitForm, getAllForms } = require("../controller/formController");
const { createTransaction, getAllTransactions } = require("../controller/statusController");

// USER API
router.post("/login", login);
router.post("/signup", signup);

router.get("/profile", verifyToken, profile, (req, res) => {
    res.json({ user: req.user });
});

router.get("/users", getAllUsers);

// MITRA API
router.post("/pendataan", pendataan);
router.get("/mitra", mitra);
router.get("/findMitra", findMitraByName);

// PRICE API
router.post("/price", harga);
router.get("/getPrice", getPriceByMonth);

// EDUCATION API
router.post("/postEdu", education);
router.get("/education", getAlleducation);

// TOTAL HARGA API
router.post("/totalHarga", verifyToken, createTotalPrice);
router.get("/getTotalHarga", verifyToken, getTotalPrice);

// FORM API
router.post("/submitForm", verifyToken, submitForm);
router.get("/getAllForms", getAllForms);

// STATUS API
router.post("/status", createTransaction);
router.get("/getStatus", verifyToken, getAllTransactions);

module.exports = router;
