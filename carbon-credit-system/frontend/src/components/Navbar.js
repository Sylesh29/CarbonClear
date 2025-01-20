import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

const Navbar = () => (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
                <FaLeaf className="mr-2 text-green-400" /> Carbon Credit System
            </h1>
            <ul className="flex space-x-6">
                <li><Link to="/" className="hover:text-green-400">Home</Link></li>
                <li><Link to="/dashboard" className="hover:text-green-400">Dashboard</Link></li>
                <li><Link to="/marketplace" className="hover:text-green-400">Marketplace</Link></li>
                <li><Link to="/retirement" className="hover:text-green-400">Retirement</Link></li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
