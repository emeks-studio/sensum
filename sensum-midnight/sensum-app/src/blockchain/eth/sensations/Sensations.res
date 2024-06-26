// Be careful, these methods serve as type checking at rescript level, 
// but if in runtime returns something different, there will be still a bug!

@module("./Sensations.js")
external getContract: (~config: Types.config, ~provider: Types.provider) => Types.Contract.t = "getContract"

@module("./Sensations.js")
external getSensationByIndex: (~contract: Types.Contract.t, ~index: Types.BigInt.t) => promise<Types.sensation> = "getSensationByIndex"

@module("./Sensations.js")
external getLatestSensation: (~contract: Types.Contract.t) => promise<Types.sensation> = "getLatestSensation"

@module("./Sensations.js")
external getSensationsLength: (~contract: Types.Contract.t) => promise<Types.BigInt.t> = "getSensationsLength"

@module("./Sensations.js")
external newSensation: (~contract: Types.Contract.t, ~sensation: Types.sensation, ~wallet: Types.wallet) => promise<Types.confirmedTransaction> = "newSensation"

@module("./Sensations.js")
external estimateCost: (~provider: Types.provider, ~contract: Types.Contract.t, ~wallet: Types.wallet, ~sensation: Types.sensation) => promise<string> = "estimateCost"



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