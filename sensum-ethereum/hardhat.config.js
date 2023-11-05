require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

console.log("About to load keys.json")
let fs = require('fs');
const keys = JSON.parse(fs.readFileSync('./keys.json', 'utf8'));

// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and replace "KEY" with it
// Obs: alchemy didn't work, btw I have an account with my personal emails
const INFURA_API_KEY = keys.INFURA_API_KEY; // account from sensumsoft@gmail

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

const SEPOLIA_PRIVATE_KEY = keys.SEPOLIA_PRIVATE_KEY; // leaked private key
// ^ request funds: 
// https://www.infura.io/faucet/sepolia?_ga=2.102737665.1466658822.1699122659-267243817.1699122659

// npx hardhat run scripts/sensations-deploy.js --network sepolia
module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
