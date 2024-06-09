
module DefaultRightComponent = {
  @react.component
  let make = () => {
    <div className="flex">
      <Core_Ui_GraveyardButton /><Core_Ui_SanctuaryButton /><Core_Ui_ConfigButton />
    </div>
  }
}

@scope("import.meta.env") @val external appVersion: string = "APP_VERSION"
@scope("window.location") @val external reloadPage: bool => unit = "reload"

@react.component
let make = (~rightComponent: React.element=<DefaultRightComponent />) => {

  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    reloadPage(true)
  }

  // FIXME: Make it responsive!
  <header
    className="border-purple-900 border-b-2 flex justify-between">
    <div className="flex flex-row items-baseline group relative">
      <h1 className="pl-2 text-xl lg:text-4xl text-purple-50">
        {"δensum"->React.string}
      </h1>
      <button onClick>
        <a className="pl-2 text-sm lg:text-md text-purple-50" >
          {`(v${appVersion})`->React.string}
        </a>   
      </button>
    </div>
    {rightComponent}
  </header>
}
