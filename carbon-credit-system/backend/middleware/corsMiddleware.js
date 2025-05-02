const cors = require("cors");

exports.corsOptions = cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000", "https://yourdomain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
});
