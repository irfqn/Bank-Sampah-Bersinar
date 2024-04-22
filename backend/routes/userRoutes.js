const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken")
const { login, signup, profile } = require("../controller/userController");

router.post("/login", login);
router.post("/signup", signup);

router.get("/profile", verifyToken, profile, (req, res) => {
    res.json({ user: req.user })
})

// router.get("/:userId", verifyToken, getUserById);

module.exports = router;
