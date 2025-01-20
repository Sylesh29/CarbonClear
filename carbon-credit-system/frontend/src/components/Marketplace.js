import React, { useState } from "react";
import { getContract } from "../utils/contract";
import { FaExchangeAlt, FaUser, FaWallet } from "react-icons/fa";

const Marketplace = () => {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const tradeCredits = async () => {
        if (!recipient || !amount) {
            alert("Please fill in both recipient address and amount.");
            return;
        }
        try {
            const { contract, signer } = await getContract();
            const sender = await signer.getAddress();
            const tx = await contract.safeTransferFrom(
                sender,
                recipient,
                1, // Issued Credits token ID
                amount,
                "0x"
            );
            await tx.wait();
            alert("Credits traded successfully!");
            setRecipient("");
            setAmount("");
        } catch (error) {
            console.error("Error trading credits:", error);
            alert("An error occurred while trading credits. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Marketplace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Info Card 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaExchangeAlt className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold">Seamless Trading</h2>
                    <p className="text-gray-600 mt-2">
                        Trade carbon credits securely and transparently with blockchain technology.
                    </p>
                </div>

                {/* Info Card 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaWallet className="text-4xl text-green-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold">Real-Time Settlement</h2>
                    <p className="text-gray-600 mt-2">
                        Transactions settle in real-time, eliminating delays and inefficiencies.
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Trade Carbon Credits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Recipient Address
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter recipient's wallet address"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                className="border rounded-lg px-10 py-2 w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Amount</label>
                        <div className="relative">
                            <FaWallet className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="number"
                                placeholder="Enter amount to trade"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border rounded-lg px-10 py-2 w-full"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={tradeCredits}
                    className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                    Trade Credits
                </button>
                <p className="text-sm text-gray-500 mt-2">
                    * Ensure the recipient's wallet address is correct before proceeding.
                </p>
            </div>
        </div>
    );
};

export default Marketplace;
