const pool = require("../config/database");

exports.tradeCredits = async (req, res) => {
    try {
        const { buyer_id, seller_id, credit_id, amount } = req.body;
        if (!buyer_id || !seller_id || !credit_id || !amount) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await pool.execute("UPDATE CarbonCredits SET status='traded' WHERE credit_id=?", [credit_id]);

        await pool.execute(
            `INSERT INTO Transactions (buyer_id, seller_id, credit_id, amount) VALUES (?, ?, ?, ?)`,
            [buyer_id, seller_id, credit_id, amount]
        );

        res.status(200).json({ success: true, message: "Trade Successful" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getMarketplaceListings = async (req, res) => {
    try {
        const [listings] = await pool.execute(`SELECT * FROM CarbonCredits WHERE status = 'pending'`);
        res.status(200).json({ success: true, listings: listings || [] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
