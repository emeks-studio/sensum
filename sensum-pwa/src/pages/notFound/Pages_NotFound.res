@react.component
let make = () => {
  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.replace("/dsensum/")
  }
  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="flex flex-1 overflow-y-scroll justify-center items-center">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl text-purple-50"> {"You enter into the limbo"->React.string} </h1>
        <button onClick>
          <a className="text-purple-400"> {"follow lost souls"->React.string} </a>
        </button>
      </div>
    </main>
  </div>
}
