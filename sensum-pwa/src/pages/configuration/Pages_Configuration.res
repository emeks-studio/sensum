@react.component
let make = () => {
  let (networkUrl, saveNetworkUrl) = State.Configuration.useNetworkHook()
  let networkForm = {
    let defaultUrl = switch networkUrl {
    | None => State.Configuration.defaultUrl
    | Some(url) => url
    }
    let (networkUrlInput, setNetworkInput) = React.useState(_ => defaultUrl)

    let onChange = event => {
      let updatedValue = ReactEvent.Form.target(event)["value"]
      setNetworkInput(_ => updatedValue)
    }

    let onSave = _event => {
      saveNetworkUrl(networkUrlInput)
    }

    <div className="my-10 grid grid-rows-1 grid-flow-col gap-3 place-content-center ">
      <label htmlFor="networkInput" className="text-xl text-purple-50">
        {"network"->React.string}
      </label>
      <input
        className="form-control px-2"
        id="networkInput"
        placeholder="Blockchain Network Provider"
        value=networkUrlInput
        onChange
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
