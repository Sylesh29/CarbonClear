const hre = require("hardhat");

async function main() {
    // Get the first signer (deployer)
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the CarbonCredit contract
    const CarbonCredit = await hre.ethers.getContractFactory("CarbonCredit");
    const carbonCredit = await CarbonCredit.deploy(); // No need for .deployed()

    console.log("CarbonCredit contract deployed to:", carbonCredit.target); // Use `target` in ethers v6
}

// Catch errors and exit the process
main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
