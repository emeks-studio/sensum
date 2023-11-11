import { ethers } from 'ethers';

export async function getNetwork(provider) {
  return provider.getNetwork();
}

export async function getBlockNumber(provider) {
  return provider.getBlockNumber();
}

export function getProvider(networkUrl) {
  return networkUrl === 'sepolia' ?
   ethers.getDefaultProvider('sepolia', {exclusive: ["infura"]}) : new ethers.JsonRpcProvider(networkUrl);
}

// TODO: Do some cleanup!
// export function getProvider(networkUrl) {
//   return networkUrl === 'sepolia' ?
//    ethers.getDefaultProvider('sepolia', {infura: "your_api_key", exclusive: ["infura"]}) : new ethers.JsonRpcProvider(networkUrl);
// }

export function toBigInt(x) {
 return BigInt(x);
}

export function addBigInt(x, y) {
  return x + y;
}

 export function subBigInt(x, y) {
  return x - y;
}
