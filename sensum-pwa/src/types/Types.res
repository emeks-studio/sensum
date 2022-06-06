// In order to avoid circule dependencies 
// we define types separeted from the rest of the code

// #--- Blockchain types ---#
type network = {
  chainId: int,
  name: string
}

// TODO: Redefine this type
type confirmedTransaction

module BigInt = {
  // Internal state: Object { _hex: "0x2b", _isBigNumber: true }
  type t
  @send external toString: t => string = "toString"
}

type sensation = {
  avatar: BigInt.t,
  message: string
}

// #--- State types ---#
type config = {
  sensationsContractAddress: string,
  networkUrl: string,
}