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