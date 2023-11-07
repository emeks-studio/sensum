
@module("./Ethers.js")
external getNetwork: (~networkUrl: string) => promise<Types.network> = "getNetwork"

@module("./Ethers.js")
external getBlockNumber: (~networkUrl: string) => promise<Types.BigInt.t> = "getBlockNumber"

@module("./Ethers.js")
external getProvider: (~networkUrl: string)  => Types.provider = "getProvider"

@module("./Ethers.js")
external toBigInt: int => Types.BigInt.t = "toBigInt"

@module("./Ethers.js")
external addBigInt: (Types.BigInt.t, Types.BigInt.t) => Types.BigInt.t = "addBigInt"

@module("./Ethers.js")
external subBigInt: (Types.BigInt.t, Types.BigInt.t) => Types.BigInt.t = "subBigInt"
