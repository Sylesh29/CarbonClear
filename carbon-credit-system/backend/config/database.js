const mysql = require('mysql2/promise');
require('dotenv').config();

// Environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Validate environment variables
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error("Missing required database environment variables");
}

// Create MySQL connection pool
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : false, // Added optional SSL
});

// Database query function
const query = async (sql, params = []) => {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = { pool, query };
