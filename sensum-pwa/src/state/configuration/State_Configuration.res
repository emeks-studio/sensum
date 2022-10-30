let storage = Dom.Storage2.localStorage

// From executing: npx hardhat run scripts/sensations-deploy.js --network localhost
// Obs: You can also use an ENS name for the contract address
// let defaultSensationsContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

// @Deprecated
// Deployed tx: https://ropsten.etherscan.io/tx/0x29ef130f4288054c287481356458614b26ebdf98adbf5c521e34f552b81ad02a
// let defaultSensationsContractAddress = "0xb016b0f45dcf44c99804e876aefcc82ea4ed6099"
// let defaultUrl = "ropsten"

// Current default:
let defaultSensationsContractAddress = ""
let defaultUrl = "http://127.0.0.1:8545"

let defaultConfig: Types.config = {
  sensationsContractAddress: defaultSensationsContractAddress,
  networkUrl: defaultUrl
}

// bind to JS' JSON.parse
@scope("JSON") @val
external configFromJSON: string => Types.config = "parse"

let configStorageKey = "config"

let useConfig = () => {
  let (maybeConfig, setConfig) = React.useState(_ => 
    storage->Dom.Storage2.getItem(configStorageKey)->Belt.Option.map(configFromJSON)
  )

  let saveConfig = (~networkUrl: string, ~sensationsContractAddress: string) => {
    if (networkUrl == "" || sensationsContractAddress == "") {
      Belt.Result.Error("Empty settings not allowed")
    } else {
      let updatedConfig: Types.config = {
        networkUrl: networkUrl,
        sensationsContractAddress: sensationsContractAddress
      }
      let maybeUpdatedConfigSerialized = Js.Json.stringifyAny(updatedConfig)
      switch maybeUpdatedConfigSerialized {
        | Some(updatedConfigSerialized) => {
          storage->Dom.Storage2.setItem(configStorageKey, updatedConfigSerialized)
          setConfig(_ => Some(updatedConfig))
          Belt.Result.Ok(())
        }
        | None => {
          Belt.Result.Error("Could not serialize updated config")
        }
      }
    }
  }
  (maybeConfig, saveConfig, defaultConfig)
}
