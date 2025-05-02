const express = require("express");

const authRoutes = require("./authRoutes");
const issuanceRoutes = require("./issuanceRoutes");
const tradeRoutes = require("./tradeRoutes");
const retireRoutes = require("./retireRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

// API Routes
router.use("/auth", authRoutes);
router.use("/issue", issuanceRoutes);
router.use("/trade", tradeRoutes);
router.use("/retire", retireRoutes);
router.use("/user", userRoutes);

module.exports = router;
