
// Types for the bindings related to Service Worker notification API
type register
type params = {
  body: string
}

// NOTE: This bindings should be used in a Service Worker.
@scope("self") @val external registration: register = "registration"

@send external showNotification: register => string => params => unit = "showNotification"

let subscribe = () => {
    // FIXME: Receive the configuration updates, via Service Worker postMessage
    // Ref. https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage
    // let config = State.Configuration.readConfig()
    let config = State.Configuration.defaultConfig
    let provider = Ethers.getProvider(~networkUrl=config.networkUrl)
    let contract = Sensations.getContract(~config, ~provider)
    let handler = (event) => {
      let {message} = event->Types.Contract.getSensation
      // TODO: For correctness, check if user has granted the notifications permissions
      //       Otherwise you will get an error
      registration->showNotification("New sensation:", {body: message})->ignore
    }
    contract->Types.Contract.subscribe("Synapsis", handler)
}
