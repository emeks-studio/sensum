
@module("./Ethers.js")
external getNetwork: (~networkUrl: string) => Promise.t<Types.network> = "getNetwork"

@module("./Ethers.js")
external getBlockNumber: (~networkUrl: string) => Promise.t<Types.bigInt> = "getBlockNumber"
