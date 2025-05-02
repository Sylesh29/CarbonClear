const pool = require("../config/database");

exports.createUser = async (name, email, hashedPassword, role) => {
    try {
        const [result] = await pool.execute(
            `INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        );
        return result.insertId;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const [users] = await pool.execute(`SELECT * FROM Users WHERE email = ?`, [email]);
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};
