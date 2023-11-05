// Be careful, these methods serve as type checking at rescript level, 
// but if in runtime returns something different, there will be still a bug!

@module("./Sensations.js")
@val external getSensationByIndex: (~config: Types.config, ~index: Types.BigInt.t) => promise<Types.sensation> = "getSensationByIndex"

@module("./Sensations.js")
@val external getLatestSensation: (~config: Types.config) => promise<Types.sensation> = "getLatestSensation"

@module("./Sensations.js")
@val external getSensationsLength: (~config: Types.config) => promise<Types.BigInt.t> = "getSensationsLength"

@module("./Sensations.js")
@val external newSensation: (~config: Types.config, ~s: Types.sensation) => promise<Types.confirmedTransaction> = "newSensation"




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