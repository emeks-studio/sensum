// Be careful, these methods serve as type checking at rescript level, 
// but if in runtime returns something different, there will be still a bug!

type sensation = {
  author: string,
  message: string
}

// TODO: Redefine this type
type confirmedTransaction

// TODO: Redefine this type! Ex. Object { _hex: "0x2b", _isBigNumber: true }
type bigInt

@module("./Sensations.js")
external getSensationByIndex: (~index: bigInt) => Js.Promise.t<sensation> = "getSensationByIndex"

// Notice that use the same JS method `getSensationByIndex`, but propose different type signature!
@module("./Sensations.js")
external getSensationByIntIndex: (~index: int) => Js.Promise.t<sensation> = "getSensationByIndex"

@module("./Sensations.js")
external getLatestSensation: () => Js.Promise.t<sensation> = "getLatestSensation"

@module("./Sensations.js")
external getSensationsLength: () => Js.Promise.t<bigInt> = "getSensationsLength"

@module("./Sensations.js")
external newSensation: (~s: sensation) => Js.Promise.t<confirmedTransaction> = "newSensation"
