import React from "react";
import heroImage from "../images/background.jpg";


const HeroSection = () => (
    <div
        className="h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${heroImage})` }}
    >
        <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
                Revolutionizing Carbon Credit Management
            </h1>
            <p className="text-lg mb-8">
                A blockchain-powered platform for transparency, accountability, and sustainability.
            </p>
            <a
                href="/dashboard"
                className="bg-green-500 px-8 py-4 text-xl font-semibold rounded-lg hover:bg-green-600"
            >
                Get Started
            </a>
        </div>
    </div>
);

export default HeroSection;
