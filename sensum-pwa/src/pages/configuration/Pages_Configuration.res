module NetworkForm = {
  @react.component
  let make = (
    ~maybeConfig: option<State.Configuration.config>,
    ~saveConfig: (
      ~networkUrl: string,
      ~sensationsContractAddress: string,
    ) => Belt.Result.t<unit, string>,
  ) => {
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
      let result = saveConfig(
        ~networkUrl=networkUrlInput,
        ~sensationsContractAddress=sensationsContractAddressInput,
      )
      // TODO: Display error instead of logging it!
      switch result {
        | Error(msg) => Js.Console.log2("Error: ", msg)
        | _ => ignore()
      }
    }

    <div className="my-10 grid grid-flow-row gap-3 place-content-center">
      <label htmlFor="networkInput" className="text-xl text-purple-50">
        {"blockchain network provider"->React.string}
      </label>
      <input
        className="form-control px-2"
        id="networkInput"
        placeholder="http://127.0.0.1:8545"
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
}

@react.component
let make = () => {
  let (maybeConfig, saveConfig) = State.Configuration.useConfig()

  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar rightComponent={<Core.Ui.ConfigButton />} />
    <main className="overflow-y-scroll"> {<NetworkForm maybeConfig saveConfig />} </main>
  </div>
}
