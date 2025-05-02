import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Marketplace from "./components/Marketplace";
import Retirement from "./components/Retirement";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPanel from "./components/AdminPanel";
import ProfileWallet from "./components/ProfileWallet";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="min-h-screen bg-gray-100">
                <Routes>
                    {/* Redirect "/home" to "/" */}
                    <Route path="/home" element={<Navigate to="/" />} />

                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* All Pages Accessible for UI Testing */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/retirement" element={<Retirement />} />
                    <Route path="/profile" element={<ProfileWallet />} />
                    <Route path="/admin" element={<AdminPanel />} />

                    {/* Fallback for invalid routes */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
