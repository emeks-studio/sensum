
@module("./Ethers.js")
external getNetwork: (~provider: Types.provider) => promise<Types.network> = "getNetwork"

@module("./Ethers.js")
external getBlockNumber: (~provider: Types.provider) => promise<Types.BigInt.t> = "getBlockNumber"

@module("./Ethers.js")
external getProvider: (~networkUrl: string)  => Types.provider = "getProvider"

@module("./Ethers.js")
external toBigInt: int => Types.BigInt.t = "toBigInt"

@module("./Ethers.js")
external addBigInt: (Types.BigInt.t, Types.BigInt.t) => Types.BigInt.t = "addBigInt"

@module("./Ethers.js")
external subBigInt: (Types.BigInt.t, Types.BigInt.t) => Types.BigInt.t = "subBigInt"
