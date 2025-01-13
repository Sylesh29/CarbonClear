require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.18",
    networks: {
        amoy: {
            url: process.env.QUICKNODE_AMOY_URL, 
            accounts: [`0x${process.env.PRIVATE_KEY}`], 
        },
    },
};
