// In order to avoid circule dependencies 
// we define types separeted from the rest of the code

// #--- Blockchain types ---#
type network = {
  chainId: int,
  name: string
}

// TODO: Redefine this type
type confirmedTransaction

// TODO: Redefine this type! Ex. Object { _hex: "0x2b", _isBigNumber: true }
type bigInt

type sensation = {
  avatar: bigInt,
  message: string
}

// #--- State types ---#
type config = {
  sensationsContractAddress: string,
  networkUrl: string,
}