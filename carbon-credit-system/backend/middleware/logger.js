const morgan = require("morgan");

exports.logger = morgan(process.env.NODE_ENV === "production" ? "combined" : "dev");
