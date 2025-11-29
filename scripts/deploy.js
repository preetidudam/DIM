const hre = require("hardhat");

/**
 * Deploys the DeviceRegistry contract and logs the deployed address.
 */
async function main() {
  await hre.run("compile");

  const DeviceRegistry = await hre.ethers.getContractFactory("DeviceRegistry");
  const deviceRegistry = await DeviceRegistry.deploy();
  await deviceRegistry.waitForDeployment();

  console.log("DeviceRegistry deployed to:", await deviceRegistry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

