// Ref. https://rescript-lang.org/docs/react/latest/router#basic-example
@react.component
let make = () => {
  let (config, saveConfig) = State.Configuration.useConfig()

  React.useEffect1(_ => {

    let provider = Ethers.getProvider(~networkUrl=config.networkUrl)
    Ethers.getNetwork(~provider)
    ->Promise.then(status => {
      Js.Console.log2("getNetwork::chainId", status.chainId)
      Promise.resolve()
    })
    ->Promise.catch(err => {
      Js.Console.log2("getNetwork::error", err)
      Promise.resolve()
    })
    ->ignore
    Ethers.getBlockNumber(~provider)
    ->Promise.then(blockNumber => {
      Js.Console.log2("getBlockNumber::response", blockNumber)
      Promise.resolve()
    })
    ->Promise.catch(err => {
      Js.Console.log2("getBlockNumber::error", err)
      Promise.resolve()
    })
    ->ignore
    None
  }, [config])

  let routerUrl = RescriptReactRouter.useUrl()

  switch routerUrl.hash {
  | "sanctuary" => <Pages_NewSensation config/>
  | "graveyard" => <Pages_Sensations config/>
  | "config" => <Pages_Configuration config saveConfig />
  | _ => <Pages_Sensations config />
  }
}
