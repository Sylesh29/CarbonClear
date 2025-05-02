const pool = require("../config/database");

exports.createTransaction = async (buyer_id, seller_id, credit_id, amount) => {
    try {
        await pool.execute(`UPDATE CarbonCredits SET status='traded' WHERE credit_id=?`, [credit_id]);

        const [result] = await pool.execute(
            `INSERT INTO Transactions (buyer_id, seller_id, credit_id, amount) VALUES (?, ?, ?, ?)`,
            [buyer_id, seller_id, credit_id, amount]
        );

        return result.insertId;
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
};

exports.getTransactionHistory = async (user_id) => {
    try {
        const [transactions] = await pool.execute(
            `SELECT * FROM Transactions WHERE buyer_id = ? OR seller_id = ?`,
            [user_id, user_id]
        );
        return transactions || [];
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        throw error;
    }
};
