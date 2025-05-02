const { body, validationResult } = require("express-validator");

exports.validateIssueCredits = [
    body("project_name").trim().notEmpty().withMessage("Project name is required"),
    body("total_credits").isInt({ min: 1 }).withMessage("Total credits must be a positive integer"),
    body("price_per_credit").isFloat({ min: 0 }).withMessage("Price per credit must be a positive number"),
    body("expiry_date").isISO8601().withMessage("Invalid date format. Use YYYY-MM-DD."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];
