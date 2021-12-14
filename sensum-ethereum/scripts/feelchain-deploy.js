const hre = require("hardhat");

async function main() {
    const contractName = "FeelChain";
    const contractFactory = await hre.ethers.getContractFactory(contractName);
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log(`${contractName} deployed to:`, contract.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
