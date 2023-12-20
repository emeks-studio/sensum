@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let isActive = () => {
    switch url.path {
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
    <a className="hidden lg:block text-xl text-purple-50 pl-5 pr-5">{"SANCTUARY"->React.string}</a>
    <a className="lg:hidden text-xl text-purple-50 pl-5 pr-5">{"S"->React.string}</a>
  </button>
}
