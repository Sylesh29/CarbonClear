import React from "react";
import transparencyImg from "../images/blockchain.jpg"; 
import sustainabilityImg from "../images/sustainability.jpg"; 
import tradingImg from "../images/trading.jpg"; 

const Features = () => (
    <div className="py-12 bg-gray-100">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img
                        src={transparencyImg}
                        alt="Transparency"
                        className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                    <p>
                        Blockchain ensures every carbon credit is traceable and verifiable.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img
                        src={sustainabilityImg}
                        alt="Sustainability"
                        className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p>
                        Encourage eco-friendly initiatives by managing carbon offsets effectively.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <img
                        src={tradingImg}
                        alt="Real-Time Trading"
                        className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold mb-2">Real-Time Trading</h3>
                    <p>
                        Facilitate peer-to-peer trading of carbon credits seamlessly.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Features;
