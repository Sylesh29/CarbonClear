import React, { useState, useEffect } from "react";

const ProfileWallet = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        role: "Issuer",
        balance: "5000",
    });

    const [transactions, setTransactions] = useState([
        { id: 1, type: "Credit Purchase", amount: 100, date: "2024-02-01 10:30 AM" },
        { id: 2, type: "Credit Sale", amount: 250, date: "2024-02-02 2:45 PM" },
        { id: 3, type: "Retirement", amount: 50, date: "2024-02-03 5:00 PM" },
    ]);

    useEffect(() => {
        // Fetch user profile and transactions from MySQL DB (Integration to be added)
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl border border-gray-200">
                <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">User Profile & Wallet</h2>

                {/* Profile Section */}
                <div className="mb-6 p-6 bg-gray-100 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Profile Information</h3>
                    <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                    <p className="text-gray-600"><strong>Role:</strong> {user.role}</p>
                </div>

                {/* Wallet Section */}
                <div className="mb-6 p-6 bg-green-100 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Wallet Balance</h3>
                    <p className="text-4xl font-bold text-green-600">${user.balance}</p>
                </div>

                {/* Transaction History */}
                <div className="p-6 bg-gray-100 rounded-xl shadow">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">Transaction History</h3>
                    {transactions.length === 0 ? (
                        <p className="text-gray-600 text-center">No transactions found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {transactions.map((txn) => (
                                <li key={txn.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center border border-gray-200">
                                    <div>
                                        <p className="text-gray-700"><strong>Type:</strong> {txn.type}</p>
                                        <p className="text-gray-500 text-sm">{txn.date}</p>
                                    </div>
                                    <p className={`text-xl font-bold ${txn.type === "Retirement" ? "text-red-500" : "text-green-600"}`}>
                                        ${txn.amount}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileWallet;
