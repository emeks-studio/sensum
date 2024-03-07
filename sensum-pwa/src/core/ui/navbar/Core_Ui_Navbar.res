module DefaultRightComponent = {
  @react.component
  let make = () => {
    <div className="flex">
      <Core_Ui_GraveyardButton />
      <Core_Ui_SanctuaryButton />
      <Core_Ui_ConfigButton />
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
  <header className="flex items-center justify-between">
    <div className="w-36 h-24 bg-contain flex justify-center items-center bg-sensum-logo bg-center">
      <div
        data="δensum"
        className="text-purple-50 text-base animate-gltch before:content-[attr(data)] before:animate-gltch-before before:absolute before:left-0 after:content-[attr(data)] after:animate-gltch-after after:absolute after:left-0">
        {"δensum"->React.string}
      </div>
    </div>
    {rightComponent}
  </header>
}
