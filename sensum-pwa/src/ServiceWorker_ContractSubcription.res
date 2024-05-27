
// Types for the bindings related to Service Worker notification API
type register
type params = {
  body: string
}

// NOTE: This bindings should be used in a Service Worker.
@scope("self") @val external registration: register = "registration"

@send external showNotification: register => string => params => unit = "showNotification"

type configEvent = {data: Types.config}
@val external addEventListener: (string, configEvent => unit) => unit = "addEventListener"

let getContract = (config: Types.config) => {
  let provider = Ethers.getProvider(~networkUrl=config.networkUrl)
  Sensations.getContract(~config, ~provider)
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

let initNotifications = () => {
  let contract: ref<Types.Contract.t> = ref(getContract(State_Configuration.defaultConfig))
  contractSub(contract.contents)
  addEventListener("message", configEvent => {
    contractDesub(contract.contents)
    contract.contents = getContract(configEvent.data)
    contractSub(contract.contents)
  })
}
