
module DefaultRightComponent = {
  @react.component
  let make = () => {
    <div className="flex">
      <Core_Ui_GraveyardButton /><Core_Ui_SanctuaryButton /><Core_Ui_ConfigButton />
    </div>
  }
}

@react.component
let make = (~rightComponent: React.element=<DefaultRightComponent />) => {
  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.replace("/dsensum")
  }
  
  // FIXME: Make it responsive!
  <header
    className="border-purple-900 border-b-2 flex justify-between">
    <button onClick>
      <h1 className="pl-2 text-xl lg:text-4xl text-purple-50">
        {"δensum"->React.string}
      </h1>
    </button>
    {rightComponent}
  </header>
}
