@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let isActive = () => {
    switch url.path {
    | list{} => true
    | list{"sanctuary"} => true
    | _ => false
    }
  }

  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.replace("/sanctuary")
  }

  <button
    className={isActive() ? "bg-purple-900" : "hover:bg-purple-900"}
    disabled={isActive()}
    onClick={onClick}>
    <a className="text-xl text-purple-50 pl-5 pr-5">{"Sanctuary"->React.string}</a>
  </button>
}
