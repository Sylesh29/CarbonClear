const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.execute(
            `INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const [users] = await pool.execute(`SELECT * FROM Users WHERE email = ?`, [email]);

        if (users.length === 0) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, users[0].password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ user_id: users[0].user_id, role: users[0].role }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
