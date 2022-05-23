type network = {
  chainId: int,
  name: string
}

type bigInt

@module("./Ethers.js")
external getNetwork: (~networkUrl: string) => Promise.t<network> = "getNetwork"

@module("./Ethers.js")
external getBlockNumber: (~networkUrl: string) => Promise.t<bigInt> = "getBlockNumber"
