import React, { useState } from "react";
import { getContract } from "../utils/contract";
import { FaExchangeAlt, FaWallet } from "react-icons/fa";

const Marketplace = () => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const tradeCredits = async () => {
        if (!recipient || !amount) {
            alert("Please fill in both recipient address and amount.");
            return;
        }
        try {
            setLoading(true);
            const { contract, signer } = await getContract();
            const sender = await signer.getAddress();
            const tx = await contract.safeTransferFrom(sender, recipient, 1, amount, "0x");
            await tx.wait();
            setRecipient("");
            setAmount("");
            alert("Transaction successful!");
        } catch (error) {
            console.error("Error trading credits:", error);
            alert("Transaction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">Carbon Credit Marketplace</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-8 rounded-xl shadow-xl text-center">
                    <FaExchangeAlt className="text-5xl text-blue-500 mb-4 mx-auto" />
                    <h2 className="text-3xl font-semibold">Seamless Trading</h2>
                    <p className="text-gray-600 mt-3">Secure and transparent carbon credit trading using blockchain technology.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-xl text-center">
                    <FaWallet className="text-5xl text-green-500 mb-4 mx-auto" />
                    <h2 className="text-3xl font-semibold">Real-Time Settlement</h2>
                    <p className="text-gray-600 mt-3">Transactions are settled in real-time, ensuring efficiency and reliability.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Trade Carbon Credits</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="number"
                        placeholder="Amount to Trade"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={tradeCredits}
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white transition-all ${
                            loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {loading ? "Processing..." : "Trade Credits"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
