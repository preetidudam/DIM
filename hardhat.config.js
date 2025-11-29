require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { SEPOLIA_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

// Validate private key format (must be 66 chars: 0x + 64 hex chars)
const isValidPrivateKey = (key) => {
  if (!key || typeof key !== "string") return false;
  // Remove 0x prefix if present for length check
  const keyWithoutPrefix = key.startsWith("0x") ? key.slice(2) : key;
  // Must be 64 hex characters (32 bytes)
  return /^[0-9a-fA-F]{64}$/.test(keyWithoutPrefix);
};

// Only use PRIVATE_KEY if it's valid, otherwise use empty array
const getAccounts = () => {
  if (PRIVATE_KEY && isValidPrivateKey(PRIVATE_KEY)) {
    return [PRIVATE_KEY];
  }
  return [];
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: getAccounts(),
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || "",
  },
};
