module NetworkForm = {
  @react.component
  let make = (
    ~config: Types.config,
    ~saveConfig: (
      ~networkUrl: string,
      ~sensationsContractAddress: string,
    ) => Belt.Result.t<unit, string>,
  ) => {

    let (sensationsContractAddressInput, setSensationsContractAddressInput) = React.useState(_ =>
      config.sensationsContractAddress
    )

    let (networkUrlInput, setNetworkInput) = React.useState(_ => config.networkUrl)
    
    let onChangeSensationsContractAddressInput = event => {
      let updatedValue = ReactEvent.Form.target(event)["value"]
      setSensationsContractAddressInput(_ => updatedValue)
    }

    let onChangeNetworkUrlInput = event => {
      let updatedValue = ReactEvent.Form.target(event)["value"]
      setNetworkInput(_ => updatedValue)
    }

    let onSave = _event => {
      let result = saveConfig(
        ~networkUrl=networkUrlInput,
        ~sensationsContractAddress=sensationsContractAddressInput,
      )
      // TODO: Display error instead of logging it!
      switch result {
        | Error(msg) => Js.Console.log2("Error: ", msg)
        | _ => {
          RescriptReactRouter.push("/dsensum")
        }
      }
    }

    <div className="my-10 grid grid-flow-row gap-3 place-content-center">
      <label htmlFor="networkInput" className="text-xl text-purple-50">
        {"Network (blockchain provider)"->React.string}
      </label>
      <input
        className="form-control px-2"
        id="networkInput"
        placeholder="http://127.0.0.1:8545"
        value=networkUrlInput
        onChange=onChangeNetworkUrlInput
      />
      <label htmlFor="sensationsContractAddress" className="text-xl text-purple-50">
        {"Channel (contract address)"->React.string}
      </label>
      <textarea
        className="form-control px-2 resize-none"
        id="sensationsContractAddress"
        placeholder="0x..."
        value=sensationsContractAddressInput
        onChange=onChangeSensationsContractAddressInput
      />
      <button
        className="text-md px-2 text-purple-50 border-2 border-solid border-purple-50  disabled:opacity-50 hover:bg-purple-900" 
        disabled={networkUrlInput == "" || sensationsContractAddressInput == ""}
        onClick=onSave
      >
        {"SAVE"->React.string}
      </button>
    </div>
  }
}

@react.component
let make = (~config, ~saveConfig) => {
  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="overflow-y-scroll">
      <NetworkForm config saveConfig />
    </main>
  </div>
}
