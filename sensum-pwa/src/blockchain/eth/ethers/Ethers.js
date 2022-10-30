import { ethers } from 'ethers';

export async function getNetwork(networkUrl) {
  const provider = networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  return provider.getNetwork();
}

export async function getBlockNumber(networkUrl) {
  const provider = networkUrl === 'ropsten' ?
   ethers.getDefaultProvider('ropsten') : new ethers.providers.JsonRpcProvider(networkUrl);
  return provider.getBlockNumber();
}

export function toBigInt(x) {
 return ethers.BigNumber.from(String(x));
}

export function subBigInt(x, y) {
  return x.add(y);
}

 export function addBigInt(x, y) {
  return x.sub(y);
}
