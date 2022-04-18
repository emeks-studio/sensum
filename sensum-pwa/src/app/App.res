@react.component
let make = () => {
  Sensations.getSensationsLength()
  ->Promise.then(index => {
    Js.Console.log(index)
    Promise.resolve()
  })
  ->Promise.catch(err => {
    Js.Console.log(err)
    Promise.resolve()
  })
  ->ignore

  // Try with this instead, and check the COMPILE time error:
  // Sensations.getSensationByIndex(~index=1000)->Promise.then(sensation => {
  Sensations.getSensationByIntIndex(~index=1000)
  ->Promise.then(sensation => {
    Js.Console.log(sensation)
    Promise.resolve()
  })
  ->Promise.catch(err => {
    Js.Console.error(err)
    Promise.resolve()
  })
  ->ignore

  let s: Sensations.sensation = {
    author: "mk",
    message: "los Granujas sean unidos porque esa es la ley 1ra",
  }

  Sensations.newSensation(~s)
  ->Promise.then(confirmedTx => {
    Js.Console.log(confirmedTx)
    Sensations.getLatestSensation()
  })
  ->Promise.then(sensation => {
    Js.Console.log(sensation)
    Promise.resolve()
  })
  ->Promise.catch(err => {
    Js.Console.log(err)
    Promise.resolve()
  })
  ->ignore

  let items =
    Belt.Array.rangeBy(0, 42, ~step=1)
    ->Belt.Array.map(i => {
      <div key={i->Belt.Int.toString}>
        <h1 className="text-4xl text-purple-50"> {"element"->React.string} </h1>
      </div>
    })
    ->React.array

  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar rightComponent={<Core.Ui.Icons.GearIcon />} />
    <main className="flex-1 overflow-y-scroll"> {items} </main>
  </div>
}
