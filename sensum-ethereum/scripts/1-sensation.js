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
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log("Contract deployed to: ", contract.address);

  const tx = await contract.newSensation({
    "avatar": "0xe7a8aa2df7e5d0b233da615af4e7fef148bec39aef1709da0a80391ad0316563",
    "message": " Los granujas sean unidos porque ésa es la ley primera. Compartan cerveza verdadera en cualquier tiempo que sea, porque si entre ellos se pelean, los devoran el sinceja.",
    "timestamp": "2018-01-01T00:00:01.000Z"
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
