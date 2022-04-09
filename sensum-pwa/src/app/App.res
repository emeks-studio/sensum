
@react.component
let make = () => {
  
  Sensations.getSensationsLength()->Promise.then(index => {
    Js.Console.log(index)
    Promise.resolve()
  })->Promise.catch( err => {
    Js.Console.log(err)
    Promise.resolve()
  })->ignore
  
  // Try with this instead, and check the COMPILE time error:
  // Sensations.getSensationByIndex(~index=1000)->Promise.then(sensation => {
  Sensations.getSensationByIntIndex(~index=1000)->Promise.then(sensation => {
    Js.Console.log(sensation)
    Promise.resolve()
  })->Promise.catch( err => {
    Js.Console.error(err)
    Promise.resolve()
  })->ignore
  
  let s: Sensations.sensation = {
    author: "mk",
    message: "los Granujas sean unidos porque esa es la ley 1ra"
  }
  
  Sensations.newSensation(~s=s)->Promise.then(confirmedTx => {
    Js.Console.log(confirmedTx)
    Sensations.getLatestSensation()
  })
  ->Promise.then(sensation => {
    Js.Console.log(sensation)
    Promise.resolve()
  })->Promise.catch( err => {
    Js.Console.log(err)
    Promise.resolve()
  })->ignore
  
  <div>
    <h1 className="text-4xl font-bold"> {"Sensum PWA"->React.string} </h1>
    <p className="text-2xl"> {"viteJs + react + rescript + tailwindcss"->React.string} </p>
  </div>
}
