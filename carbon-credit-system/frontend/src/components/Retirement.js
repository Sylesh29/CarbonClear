import React, { useState } from "react";
import { getContract } from "../utils/contract";
import { FaTrashAlt, FaRecycle, FaCheckCircle } from "react-icons/fa";

const Retirement = () => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const retireCredits = async () => {
        if (!amount || amount <= 0) {
            setMessage("Please enter a valid amount.");
            return;
        }
        try {
            setLoading(true);
            setMessage("");
            const { contract } = await getContract();
            const tx = await contract.retireCredits(amount);
            await tx.wait();
            setAmount("");
            setMessage("Carbon credits retired successfully!");
        } catch (error) {
            console.error("Error retiring credits:", error);
            setMessage("Transaction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-8 flex items-center">
                <FaRecycle className="mr-4 text-green-500" /> Retire Carbon Credits
            </h1>
            <p className="text-gray-600 text-lg text-center max-w-2xl mb-6">
                Help the planet by permanently retiring carbon credits, ensuring they cannot be reused or double-counted.
            </p>
            
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center border border-gray-200">
                <FaTrashAlt className="text-6xl text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-semibold mb-6">Enter Amount to Retire</h2>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={retireCredits}
                    disabled={loading}
                    className={`mt-6 w-full py-3 rounded-lg text-white text-xl font-bold transition-all ${
                        loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                    {loading ? "Processing..." : "Retire Credits"}
                </button>

                {message && (
                    <div className="mt-6 text-lg font-semibold text-gray-700 flex items-center justify-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Retirement;
