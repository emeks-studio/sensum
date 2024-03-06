@react.component
let make = () => {
  let url = RescriptReactRouter.useUrl()

  let isActive = () => {
    switch url.path {
    | list{"dsensum"} => true
    | list{"dsensum", "graveyard"} => true
    | _ => false
    }
  }

  let onClick = event => {
    ReactEvent.Mouse.preventDefault(event)
    RescriptReactRouter.replace("/dsensum/graveyard")
  }

  <button
    className={isActive() ? "bg-purple-900" : "hover:bg-purple-900"}
    disabled={isActive()}
    onClick={onClick}>
    <a className="hidden lg:block text-xl text-purple-50 pl-5 pr-5">{"🪦"->React.string}</a>
    <a className="lg:hidden text-xl text-purple-50 pl-5 pr-5">{"🪦"->React.string}</a>
  </button>
}
