// In order to avoid circule dependencies 
// we define types separeted from the rest of the code

// #--- Blockchain types ---#
type network = {
  chainId: int,
  name: string
}

type provider

type contract

// TODO: Redefine this type
type confirmedTransaction

module BigInt = {
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