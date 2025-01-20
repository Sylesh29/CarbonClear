import React, { useState } from "react";
import { getContract } from "../utils/contract";
import { FaTrashAlt, FaLeaf } from "react-icons/fa";

const Retirement = () => {
    const [amount, setAmount] = useState("");

    const retireCredits = async () => {
        if (!amount) {
            alert("Please enter a valid amount.");
            return;
        }
        try {
            const { contract } = await getContract();
            const tx = await contract.retireCredits(amount);
            await tx.wait();
            alert("Credits retired successfully!");
            setAmount(""); // Reset input after success
        } catch (error) {
            console.error("Error retiring credits:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Retirement</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Info Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaLeaf className="text-4xl text-green-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold">Why Retire Credits?</h2>
                    <p className="text-gray-600 mt-2">
                        Retiring carbon credits ensures compliance with sustainability goals
                        and helps offset carbon emissions effectively.
                    </p>
                </div>
                {/* Illustration */}
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <FaTrashAlt className="text-4xl text-red-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold">Make an Impact</h2>
                    <p className="text-gray-600 mt-2">
                        Retiring credits is a permanent action that directly contributes
                        to reducing global carbon emissions.
                    </p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Retire Carbon Credits</h2>
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="number"
                        placeholder="Enter amount to retire"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 border rounded-lg px-4 py-2"
                    />
                    <button
                        onClick={retireCredits}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                    >
                        Retire Credits
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    * Retired credits cannot be reused or traded. This is a permanent action.
                </p>
            </div>
        </div>
    );
};

export default Retirement;
