import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/transactions");
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const updateUserRole = async (userId, role) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${userId}`, { role });
            fetchUsers();
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchTransactions();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Panel</h2>

                <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">User Management</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border">
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">
                                        <select
                                            className="p-1 border border-gray-300 rounded"
                                            value={user.role}
                                            onChange={(e) => updateUserRole(user.id, e.target.value)}
                                        >
                                            <option value="Issuer">Issuer</option>
                                            <option value="Buyer">Buyer</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Transaction Logs</h3>
                    <ul className="space-y-3">
                        {transactions.map((txn) => (
                            <li key={txn.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <p className="text-gray-700"><strong>User:</strong> {txn.user}</p>
                                    <p className="text-gray-700"><strong>Type:</strong> {txn.type}</p>
                                    <p className="text-gray-500 text-sm">{txn.date}</p>
                                </div>
                                <p className="font-bold text-green-600">${txn.amount}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
