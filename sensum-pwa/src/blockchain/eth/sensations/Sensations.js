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
  
export async function getSensationByIndex (config, index) {
  const provider = config.networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  const contract = new ethers.Contract(config.sensationsContractAddress, contractJsonAbi, provider);
  const sensationArray = await contract.sensations(index)
  return {avatar: sensationArray[0], message: sensationArray[1]};
}  
  
export async function getLatestSensation (config) {
  const provider = config.networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  const contract = new ethers.Contract(config.sensationsContractAddress, contractJsonAbi, provider);
  const index = await contract.getSensationsLength() - 1;
  return getSensationByIndex(config, index);
}

export async function getSensationsLength (config) {
  const provider = config.networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  const contract = new ethers.Contract(config.sensationsContractAddress, contractJsonAbi, provider);
  return contract.getSensationsLength();
}

// TODO: Improve big int inteface!
export async function getSensationsLengthFormatted (config) {
  const provider = config.networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  const contract = new ethers.Contract(config.sensationsContractAddress, contractJsonAbi, provider);
  const index = await contract.getSensationsLength();
  return index.toString();
}

export async function newSensation (config, sensation) {
  const provider = config.networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  const contract = new ethers.Contract(config.sensationsContractAddress, contractJsonAbi, provider);
  // Gets default signer
  const signer = provider.getSigner();
  // In order to execute a tx using the contract we need to connect a signer
  // TODO: Not use the default! make the user choose?
  const contractWithSigner = contract.connect(signer);
  // Wait till tx is sent!
  const tx = await contractWithSigner.newSensation(sensation);
  // Wait till tx is confirmed!
  return tx.wait();
}