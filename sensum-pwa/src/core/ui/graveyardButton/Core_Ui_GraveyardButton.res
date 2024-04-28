@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let isActive = () => {
    switch url.hash {
    | "config" => false
    | "sanctuary" => false
    | _ => true
    }
  }

  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.push("/dsensum/#graveyard")
  }

  <button
    className={isActive() ? "bg-purple-900" : "hover:bg-purple-900"}
    disabled={isActive()}
    onClick={onClick}>
    <a className="hidden lg:block text-xl text-purple-50 pl-5 pr-5">{"⛼ GRAVEYARD"->React.string}</a>
    <a className="lg:hidden text-xl text-purple-50 pl-5 pr-5">{"⛼"->React.string}</a>
  </button>
}
