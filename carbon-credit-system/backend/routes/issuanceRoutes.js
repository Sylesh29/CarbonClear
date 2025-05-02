const express = require("express");
const { issueCredits } = require("../controllers/issuanceController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/roleMiddleware");
const { validateIssueCredits } = require("../middleware/validationMiddleware");

const router = express.Router();

// Issue Carbon Credits (Restricted to issuers only)
router.post("/issue", authenticateUser, authorizeRole(["issuer"]), validateIssueCredits, issueCredits);

module.exports = router;
