@react.component
let make = () => {
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
    <main className="overflow-y-scroll"> {items} </main>
  </div>
}
