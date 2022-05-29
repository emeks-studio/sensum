// Be careful, these methods serve as type checking at rescript level, 
// but if in runtime returns something different, there will be still a bug!

// TODO: Redefine this type
type confirmedTransaction

// TODO: Redefine this type! Ex. Object { _hex: "0x2b", _isBigNumber: true }
type bigInt

type sensation = {
  avatar: bigInt,
  message: string
}

@module("./Sensations.js")
external getSensationByIndex: (~config: State.Configuration.config, ~index: bigInt) => Js.Promise.t<sensation> = "getSensationByIndex"

@module("./Sensations.js")
external getLatestSensation: (~config: State.Configuration.config) => Js.Promise.t<sensation> = "getLatestSensation"

@module("./Sensations.js")
external getSensationsLength: (~config: State.Configuration.config) => Js.Promise.t<bigInt> = "getSensationsLength"

@module("./Sensations.js")
external newSensation: (~config: State.Configuration.config, ~s: sensation) => Js.Promise.t<confirmedTransaction> = "newSensation"

// Old! now you need to pass the config as a parameter too.
// New format ex:
// "[1, "Los granujas sean unidos porque ésa es la ley primera. Compartan cerveza verdadera en cualquier tiempo que sea, porque si entre ellos se pelean, los devoran el sinceja."]"
// Ex. new sensation
//  let s: Sensations.sensation = {
//    author: "mk",
//    message: "los Granujas sean unidos porque esa es la ley 1ra",
//  }
//  Sensations.newSensation(~s)
//  ->Promise.then(confirmedTx => {
//    Js.Console.log(confirmedTx)
//    Sensations.getLatestSensation()
//  })
//  ->Promise.then(sensation => {
//    Js.Console.log2("latest sensation:", sensation)
//    Promise.resolve()
//  })
//  ->Promise.catch(err => {
//    Js.Console.log(err)
//    Promise.resolve()
//  })
//  ->ignore