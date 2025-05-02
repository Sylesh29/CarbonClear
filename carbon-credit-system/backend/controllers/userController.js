const pool = require("../config/database");

exports.getUserProfile = async (req, res) => {
    try {
        const [user] = await pool.execute(`SELECT name, email, role FROM Users WHERE user_id = ?`, [req.user.user_id]);

        if (user.length === 0) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, user: user[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getWalletBalance = async (req, res) => {
    try {
        const [wallet] = await pool.execute(`SELECT balance FROM Wallets WHERE user_id = ?`, [req.user.user_id]);

        if (wallet.length === 0) return res.status(404).json({ success: false, message: "Wallet not found" });

        res.status(200).json({ success: true, balance: wallet[0].balance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
