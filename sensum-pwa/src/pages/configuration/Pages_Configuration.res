@react.component
let make = () => {
  let (maybeConfig, saveConfig) = State.Configuration.useConfig()
  let networkForm = {
    let defaultUrl = switch maybeConfig {
    | None => State.Configuration.defaultUrl
    | Some(c) => c.networkUrl
    }
    let (networkUrlInput, setNetworkInput) = React.useState(_ => defaultUrl)

    let defaultSensationsContractAddress = switch maybeConfig {
    | None => State.Configuration.defaultSensationsContractAddress
    | Some(c) => c.sensationsContractAddress
    }
    let (sensationsContractAddressInput, setSensationsContractAddressInput) = React.useState(_ =>
      defaultSensationsContractAddress
    )

    let onChangeNetworkUrlInput = event => {
      let updatedValue = ReactEvent.Form.target(event)["value"]
      setNetworkInput(_ => updatedValue)
    }

    let onChangeSensationsContractAddressInput = event => {
      let updatedValue = ReactEvent.Form.target(event)["value"]
      setSensationsContractAddressInput(_ => updatedValue)
    }

    let onSave = _event => {
      // TODO: Do something if validation fails!
      saveConfig(
        ~networkUrl=networkUrlInput,
        ~sensationsContractAddress=sensationsContractAddressInput,
      )->ignore
    }

    <div className="my-10 grid grid-flow-row gap-3 place-content-center">
      <label htmlFor="networkInput" className="text-xl text-purple-50">
        {"network"->React.string}
      </label>
      <input
        className="form-control px-2"
        id="networkInput"
        placeholder="Blockchain Network Provider"
        value=networkUrlInput
        onChange=onChangeNetworkUrlInput
      />
      <label htmlFor="sensationsContractAddress" className="text-xl text-purple-50">
        {"sensations contract address"->React.string}
      </label>
      <textarea
        className="form-control px-2 resize-none"
        id="sensationsContractAddress"
        placeholder="0x..."
        value=sensationsContractAddressInput
        onChange=onChangeSensationsContractAddressInput
      />
      <button
        className="text-xl px-2 text-purple-50 bg-purple-500 hover:bg-purple-900" onClick=onSave>
        {"save"->React.string}
      </button>
    </div>
  }

  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar rightComponent={<Core.Ui.ConfigButton />} />
    <main className="overflow-y-scroll"> {networkForm} </main>
  </div>
}
