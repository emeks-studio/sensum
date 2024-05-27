
// Types for the bindings related to Service Worker notification API
type register
type params = {
  body: string
}

// NOTE: This bindings should be used in a Service Worker.
@scope("self") @val external registration: register = "registration"

@send external showNotification: register => string => params => unit = "showNotification"

type configEvent = {data: Types.configUpdateRequest}
@val external addEventListener: (string, configEvent => unit) => unit = "addEventListener"

let getContract = config => {
  let actualConfig = switch config {
  | None => State.Configuration.defaultConfig
  | Some(x) => x
  }
  let provider = Ethers.getProvider(~networkUrl=actualConfig.networkUrl)
  Sensations.getContract(~config=actualConfig, ~provider)
}
let showSensationNotification = event => {
  let {message} = event->Types.Contract.getSensation
  if Types.Notification.granted {
    registration->showNotification("New sensation:", {body: message})->ignore
  }
}
let contractDesub = contract => {
  contract->Types.Contract.desubscribe("Synapsis", showSensationNotification)
}
let contractSub = contract => {
  contract->Types.Contract.subscribe("Synapsis", showSensationNotification)
}

let subscribe = () => {
  contractSub(getContract(None))
  addEventListener("message", event => {
    contractDesub(getContract(Some(event.data.oldConfig)))
    contractSub(getContract(Some(event.data.updatedConfig)))
  })
}
