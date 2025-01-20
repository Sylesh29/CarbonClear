import { JsonRpcProvider, Contract } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const RPC_URL = process.env.REACT_APP_RPC_URL;

export const getContract = async () => {
    if (!RPC_URL) {
        throw new Error("RPC URL is not defined in .env");
    }

    // Create a JSON RPC provider for the local Hardhat network
    const provider = new JsonRpcProvider(RPC_URL);
    const signer = provider.getSigner(0); // Use the first test account from Hardhat's local node
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);

    return { contract, signer };
};
