const express = require("express");
const { tradeCredits, getMarketplaceListings } = require("../controllers/tradeController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Get Marketplace Listings (Public Access)
router.get("/listings", getMarketplaceListings);

// Trade Carbon Credits (Authenticated Users)
router.post("/trade", authenticateUser, tradeCredits);

module.exports = router;
