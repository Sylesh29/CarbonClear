import React, { useState, useEffect } from "react";
import { getContract } from "../utils/contract";
import { fetchData } from "../utils/api";
import { FaChartBar, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
    // State variables
    const [issuedBalance, setIssuedBalance] = useState(0);
    const [retiredBalance, setRetiredBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    // Fetch blockchain balances
    const fetchBalances = async () => {
        try {
            const { contract, signer } = await getContract();
            const address = await signer.getAddress();
            const issued = await contract.balanceOf(address, 1);
            const retired = await contract.balanceOf(address, 2);
            setIssuedBalance(issued?.toString() || 0);
            setRetiredBalance(retired?.toString() || 0);
        } catch (error) {
            console.error("Error fetching balances:", error);
            setIssuedBalance(0);
            setRetiredBalance(0);
        }
    };

    // Issue carbon credits on blockchain
    const issueCredits = async () => {
        if (!amount) {
            alert("Please enter a valid amount.");
            return;
        }
        try {
            setLoading(true);
            const { contract } = await getContract();
            const tx = await contract.issueCredits(amount);
            await tx.wait();
            setAmount("");
            fetchBalances();
        } catch (error) {
            console.error("Error issuing credits:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user data from database
    const loadUsers = async () => {
        try {
            const data = await fetchData("test-db");
            setUsers(data?.length ? data : []); // Default to an empty array if null
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // Default to an empty array if there is an error
        }
    };

    // Lifecycle hooks
    useEffect(() => {
        fetchBalances();
        loadUsers();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Blockchain balances */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaChartBar className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold">Issued Credits</h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{issuedBalance}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaCheckCircle className="text-4xl text-green-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold">Retired Credits</h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{retiredBalance}</p>
                </div>
            </div>

            {/* Issue credits form */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-bold mb-4">Issue New Credits</h2>
                <div className="flex items-center space-x-4">
                    <input
                        type="number"
                        placeholder="Enter amount to issue"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 border rounded-lg px-4 py-2"
                    />
                    <button
                        onClick={issueCredits}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg text-white ${
                            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Processing..." : "Issue Credits"}
                    </button>
                </div>
            </div>

            {/* User list from database */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <ul className="space-y-2">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <li key={user.user_id || user.id} className="border-b py-2">
                                {user.name || "Unnamed User"}
                            </li>
                        ))
                    ) : (
                        <li>No users found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
