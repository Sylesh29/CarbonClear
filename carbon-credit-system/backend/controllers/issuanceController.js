const pool = require("../config/database");

exports.issueCredits = async (req, res) => {
    try {
        const { project_name, total_credits, price_per_credit, expiry_date } = req.body;
        if (!project_name || !total_credits || !price_per_credit || !expiry_date) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const [result] = await pool.execute(
            `INSERT INTO CarbonCredits (project_name, total_credits, price_per_credit, expiry_date, status) 
             VALUES (?, ?, ?, ?, 'pending')`,
            [project_name, total_credits, price_per_credit, expiry_date]
        );

        res.status(201).json({ success: true, message: "Credits submitted for approval", credit_id: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
