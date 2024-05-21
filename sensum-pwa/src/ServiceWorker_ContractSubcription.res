
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
  // TODO: For correctness, check if user has granted the notifications permissions
  //       Otherwise you will get an error
  registration->showNotification("New sensation:", {body: message})->ignore
}
let contractDesub = contract => {
  contract->Types.Contract.desubscribe("Synapsis", showSensationNotification)
}
let contractSub = contract => {
  contract->Types.Contract.subscribe("Synapsis", showSensationNotification)
}
// TODO: Avoid using a mutable ref type?
let currentContract: ref<Types.Contract.t> = ref(getContract(None))
let subscribe = () => {
  contractSub(currentContract.contents)
  addEventListener("message", newConfig => {
    contractDesub(currentContract.contents)
    let newContract = getContract(Some(newConfig.data))
    contractSub(newContract)
    currentContract.contents = newContract
  })
}
