@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let isConfigPage = () => {
    switch url.path {
    | list{"config"} => true
    | _ => false
    }
  }

  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.replace("/config")
  }

  <button
    className={isConfigPage() ? "bg-purple-900" : "hover:bg-purple-900"}
    disabled={isConfigPage()}
    onClick={onClick}>
    // Here is used this way instead of Core.Ui.Icons.GearIcon
    // in order to avoid cycling imports
    <Core_Ui_Icons_GearIcon />
  </button>
}
