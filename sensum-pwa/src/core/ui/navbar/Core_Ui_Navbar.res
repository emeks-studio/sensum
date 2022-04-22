@react.component
let make = (~rightComponent: React.element=React.null) => {
  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.replace("/")
  }
  
  <header
    className="border-purple-900 border-b-2 flex justify-between">
    <button onClick>
      <h1 className="pl-2 text-4xl text-purple-50">
        {"sensum"->React.string}
      </h1>
    </button>
    {rightComponent}
  </header>
}
