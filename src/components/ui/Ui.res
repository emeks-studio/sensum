module UseToastBinding = {
  let useToast = %raw(`
    require('./useToast.js').useToast
`)
}

module IconBindings = {
  module Close = {
    // https://reason-react-native.github.io/en/docs/migration/jsx3/#notes-about-reasonreactwrapjsforreason--reasonreactwrapreasonforjs
    @module("../../assets/svgs/close.svg") @react.component
    external make: (~fill: string, ~height: string, ~width: string) => React.element = "default"
  }
}

// Obs: Only use "exported" modules!
module Icons = IconBindings
module Toast = UseToastBinding
