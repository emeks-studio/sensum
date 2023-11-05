import { ethers } from 'ethers';

export async function getNetwork(networkUrl) {
  const provider = networkUrl === 'sepolia' ?
   ethers.getDefaultProvider('sepolia') : new ethers.providers.JsonRpcProvider(networkUrl);
  return provider.getNetwork();
}

export async function getBlockNumber(networkUrl) {
  const provider = networkUrl === 'sepolia' ?
   ethers.getDefaultProvider('sepolia') : new ethers.providers.JsonRpcProvider(networkUrl);
  return provider.getBlockNumber();
}

export function toBigInt(x) {
 return BigInt(x);
}

export function addBigInt(x, y) {
  return x + y;
}

 export function subBigInt(x, y) {
  return x - y;
}
