const express = require("express");
const dotenv = require("dotenv");
const cors = require("./middleware/corsMiddleware").corsOptions;
const { errorHandler } = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");
const { apiLimiter } = require("./middleware/rateLimiter");
const pool = require("./config/database"); // MariaDB connection
const { contract } = require("./config/blockchain"); // Smart contract integration
const routes = require("./routes/index"); // Centralized route management

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ✅ Middleware Setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors); // Enable CORS for cross-origin requests
app.use(logger); // Log incoming API requests
app.use(apiLimiter); // Apply rate limiting to prevent abuse

// ✅ Database Connection Check
pool.getConnection()
    .then((connection) => {
        console.log("✅ Database Connected Successfully!");
        connection.release();
    })
    .catch((error) => {
        console.error("❌ Database Connection Failed:", error);
        process.exit(1); // Exit process if the database connection fails
    });

// ✅ Blockchain Connection Check
(async () => {
    try {
        const network = await contract.provider.getNetwork();
        console.log(`✅ Connected to Blockchain Network: ${network.name}`);
    } catch (error) {
        console.error("❌ Blockchain Connection Failed:", error);
        process.exit(1); // Exit process if the blockchain connection fails
    }
})();

// ✅ API Routes
app.use("/api", routes);

// ✅ Error Handling Middleware (should be after routes)
app.use(errorHandler);

// ✅ Default Route
app.get("/", (req, res) => {
    res.json({ success: true, message: "🌱 Carbon Credit Management API is running 🚀" });
});

// ✅ Handle 404 Errors
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
