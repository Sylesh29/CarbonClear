const pool = require("../config/database");

exports.getWalletBalance = async (user_id) => {
    try {
        const [wallet] = await pool.execute(`SELECT balance FROM Wallets WHERE user_id = ?`, [user_id]);
        return wallet.length > 0 ? wallet[0].balance : 0;
    } catch (error) {
        console.error("Error fetching wallet balance:", error);
        throw error;
    }
};

exports.updateWalletBalance = async (user_id, amount) => {
    try {
        await pool.execute(`UPDATE Wallets SET balance = balance + ? WHERE user_id = ?`, [amount, user_id]);
    } catch (error) {
        console.error("Error updating wallet balance:", error);
        throw error;
    }
};
