import { ethers } from "ethers";

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
              "internalType": "uint256",
              "name": "avatar",
              "type": "uint256"
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
              "internalType": "uint256",
              "name": "avatar",
              "type": "uint256"
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
          "internalType": "uint256",
          "name": "avatar",
          "type": "uint256"
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

export function getContract(config, provider) {
  return new ethers.Contract(
    config.sensationsContractAddress,
    contractJsonAbi,
    provider
  );
}

export async function getSensationByIndex(contract, index) {
  const sensationArray = await contract.sensations(index);
  return { avatar: sensationArray[0], message: sensationArray[1] };
}

export async function getLatestSensation(contract, provider) {
  const index = (await contract.getSensationsLength()) - 1;
  return getSensationByIndex(config, index);
}

export async function getSensationsLength(contract) {
  return contract.getSensationsLength()
}

export async function newSensation(contract, sensation, wallet) {
  // In order to execute a tx using the contract we need to connect a signer
  const contractWithSigner = contract.connect(wallet);
  // Wait till tx is sent!
  const tx = await contractWithSigner.newSensation(sensation);
  // Wait till tx is confirmed!
  return tx.wait();
}

export async function estimateCost(provider, contract, wallet, sensation) {
  const connectedContract = contract.connect(wallet);
  const gasPrice = (await provider.getFeeData()).gasPrice;
  const gas = await connectedContract.newSensation.estimateGas(sensation);
  return ethers.formatEther(gas * gasPrice);
}
