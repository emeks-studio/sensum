// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// TODO: Re use code from sensations-deploy.js
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const contractFactory = await hre.ethers.getContractFactory("Sensations");
  // Deployed contract: https://sepolia.etherscan.io/address/0x84D7d0F4A74930A26bD04789ffFbC573E54dFaBc
  const contract = await contractFactory.attach("0x84D7d0F4A74930A26bD04789ffFbC573E54dFaBc");

  console.log("Contract address:", contract.address);

  const tx = await contract.newSensation({
    "avatar": "0xe7a8aa2df7e5d0b233da615af4e7fef148bec39aef1709da0a80391ad0316563",
    "message": " Los granujas sean unidos porque ésa es la ley primera. Compartan cerveza verdadera en cualquier tiempo que sea, porque si entre ellos se pelean, los devoran el sinceja.",
  });

  console.log("transaction:", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
