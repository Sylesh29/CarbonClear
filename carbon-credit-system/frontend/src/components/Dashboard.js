import React, { useState, useEffect } from "react";
import { getContract } from "../utils/contract";
import { FaChartBar, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
    const [issuedBalance, setIssuedBalance] = useState(0);
    const [retiredBalance, setRetiredBalance] = useState(0);
    const [amount, setAmount] = useState("");

    const fetchBalances = async () => {
        try {
            const { contract, signer } = await getContract();
            const address = await signer.getAddress();
            const issued = await contract.balanceOf(address, 1); // Issued Credits
            const retired = await contract.balanceOf(address, 2); // Retired Credits
            setIssuedBalance(issued.toString());
            setRetiredBalance(retired.toString());
        } catch (error) {
            console.error("Error fetching balances:", error);
        }
    };

    const issueCredits = async () => {
        if (!amount) {
            alert("Please enter a valid amount.");
            return;
        }
        try {
            const { contract } = await getContract();
            const tx = await contract.issueCredits(amount);
            await tx.wait();
            alert("Credits issued successfully!");
            fetchBalances();
        } catch (error) {
            console.error("Error issuing credits:", error);
        }
    };

    useEffect(() => {
        fetchBalances();
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>
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
            <div className="bg-white p-6 rounded-lg shadow-lg">
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
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Issue Credits
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
