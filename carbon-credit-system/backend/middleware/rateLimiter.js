const rateLimit = require("express-rate-limit");

exports.apiLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // Default to 15 minutes
    max: process.env.RATE_LIMIT_MAX || 100, // Default to 100 requests per window
    message: { success: false, message: "Too many requests from this IP, please try again later" },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
