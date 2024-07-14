const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { login, signup, profile, getAllUsers } = require("../controller/userController");
const { pendataan, mitra, findMitraByName } = require("../controller/mitraController");
const { harga, getPriceByMonth } = require("../controller/priceController");
const { education, getAlleducation } = require("../controller/eduControlle");
const { createTotalPrice, getTotalPrice, resetTrashClassAndTotalHarga } = require("../controller/totalController");
const { submitForm, getAllForms, getUserFormsAndPickups } = require("../controller/formController");
const { createTransaction, getAllTransactions } = require("../controller/statusController");
const { getAllPickups, updatePickupStatus } = require("../controller/pickupController");

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
router.put("/resetTrashClass/:userId", verifyToken, resetTrashClassAndTotalHarga);

// FORM API
router.post("/submitForm", verifyToken, submitForm);
router.get("/getAllForms", getAllForms);
router.get("/userFormsAndPickups", verifyToken, getUserFormsAndPickups);

// STATUS API
router.post("/status", createTransaction);
router.get("/getStatus", getAllTransactions); // Tidak perlu token

// PICKUP API
router.get("/pickups", verifyToken, getAllPickups);
router.post("/updatePickupStatus/:id", verifyToken, updatePickupStatus);

module.exports = router;
