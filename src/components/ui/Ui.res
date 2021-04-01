// Internal modules!
module UseToastBinding = {
  let useToast = %raw(`
    require('./useToast.js').useToast
`)
}

module IconBindings = {

}

// Exported modules!
module Icons = IconBindings
module Toast = UseToastBinding
