const pool = require("../config/database");

exports.retireCredits = async (req, res) => {
    try {
        const { credit_id } = req.body;
        if (!credit_id) {
            return res.status(400).json({ success: false, message: "Credit ID is required" });
        }

        await pool.execute("UPDATE CarbonCredits SET status='retired' WHERE credit_id=?", [credit_id]);

        res.status(200).json({ success: true, message: "Credits successfully retired" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
