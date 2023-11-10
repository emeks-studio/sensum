// Ref. https://rescript-lang.org/docs/react/latest/router#basic-example
@react.component
let make = () => {
  let (maybeConfig, saveConfig, defaultConfig) = State.Configuration.useConfig()
  React.useEffect1(_ => {
    switch maybeConfig {
    | Some(config) =>
      Ethers.getNetwork(~networkUrl=config.networkUrl)
      ->Promise.then(status => {
        Js.Console.log2("getNetwork::chainId", status.chainId)
        Promise.resolve()
      })
      ->Promise.catch(err => {
        Js.Console.log2("getNetwork::error", err)
        Promise.resolve()
      })
      ->ignore

      Ethers.getBlockNumber(~networkUrl=config.networkUrl)
      ->Promise.then(blockNumber => {
        Js.Console.log2("getBlockNumber::response", blockNumber)
        Promise.resolve()
      })
      ->Promise.catch(err => {
        Js.Console.log2("getBlockNumber::error", err)
        Promise.resolve()
      })
      ->ignore 
    | None => Js.Console.log("no config!")
    }
    None
  }, [maybeConfig])

  let routerUrl = RescriptReactRouter.useUrl()

  switch maybeConfig {
  | None => <Pages_Configuration config=defaultConfig saveConfig />
  | Some(config) =>
    switch routerUrl.path {
    | list{} => <Pages_Sensations config />
    | list{"sanctuary"} => <Pages_NewSensation config/>
    | list{"graveyard"} => <Pages_Sensations config/>
    | list{"config"} => {
      <Pages_Configuration config saveConfig />
    }
    | _ => <Pages_NotFound />
    }
  }
}
