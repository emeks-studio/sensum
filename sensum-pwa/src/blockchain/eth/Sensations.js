

import { ethers } from "ethers";

// TODO: Let the user setup the provider!
const providerUrl = "http://127.0.0.1:8545"; // Using npx hardhat node
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// TODO: Remove the code!
// Sanity check, to see if provider is working ok!
// await provider.getBlockNumber().then((blockNumber) => {
//  console.log("Current block number: " + blockNumber);
// });

// From executing: npx hardhat run scripts/sensations-deploy.js --network localhost
// Obs: You can also use an ENS name for the contract address
const contractAddress = "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44";

// TODO: Use it to decode stuff returned by contract calls
// const abiEncoder = ethers.utils.defaultAbiCoder;

// TODO: Make this step less hardcoded!
// The Contract ABI, which is a common contract interface
// This json format was copied from: artifacts/contracts/Sensations.sol/Sensations.json (abi property!)
const contractJsonAbi = `[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "author",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "indexed": false,
          "internalType": "struct Sensations.sensation",
          "name": "_sensation",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "Synapsis",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getSensationsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "author",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "internalType": "struct Sensations.sensation",
          "name": "_sensation",
          "type": "tuple"
        }
      ],
      "name": "newSensation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "sensations",
      "outputs": [
        {
          "internalType": "string",
          "name": "author",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]`;

// The Contract object
const contract = new ethers.Contract(contractAddress, contractJsonAbi, provider);

const getSensationByIndex = async (index) => {
  return await contract.sensations(index);
}

const getLatestSensation = async () => {
  return await contract.sensations((await contract.getSensationsLength())- 1);
}

const getSensationsLength = async () => {
  return await contract.getSensationsLength();
}

const newSensation = async (sensation) => {
  // Gets default signer
  const signer = provider.getSigner();
  // In order to execute a tx using the contract we need to connect a signer
  // TODO: Not use the default! make the user choose?
  const contractWithSigner = contract.connect(signer);
  // Wait till tx is sent!
  const tx = await contractWithSigner.newSensation(sensation);
  // Wait till tx is confirmed!
  return await tx.wait();
}

export default {
  getSensationByIndex,
  getLatestSensation,
  getSensationsLength,
  newSensation
}
