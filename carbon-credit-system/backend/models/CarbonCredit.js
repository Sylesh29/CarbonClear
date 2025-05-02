const pool = require("../config/database");

exports.issueCredits = async (project_name, total_credits, price_per_credit, expiry_date) => {
    try {
        const [result] = await pool.execute(
            `INSERT INTO CarbonCredits (project_name, total_credits, price_per_credit, expiry_date, status) 
             VALUES (?, ?, ?, ?, 'pending')`,
            [project_name, total_credits, price_per_credit, expiry_date]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error issuing credits:", error);
        throw error;
    }
};

exports.getAvailableCredits = async () => {
    try {
        const [credits] = await pool.execute(`SELECT * FROM CarbonCredits WHERE status = 'pending'`);
        return credits || [];
    } catch (error) {
        console.error("Error fetching available credits:", error);
        throw error;
    }
};
