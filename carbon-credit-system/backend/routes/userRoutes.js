const express = require("express");
const { getUserProfile, getWalletBalance } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Get User Profile (Authenticated Users)
router.get("/profile", authenticateUser, getUserProfile);

// Get Wallet Balance (Authenticated Users)
router.get("/wallet", authenticateUser, getWalletBalance);

module.exports = router;
