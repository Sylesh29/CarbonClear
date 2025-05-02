const express = require("express");
const { retireCredits } = require("../controllers/retireController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Retire Carbon Credits (Authenticated Users)
router.post("/retire", authenticateUser, retireCredits);

module.exports = router;
