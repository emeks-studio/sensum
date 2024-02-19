// Ref. https://rescript-lang.org/docs/react/latest/router#basic-example
@react.component
let make = () => {
  let (maybeConfig, saveConfig, defaultConfig) = State.Configuration.useConfig()

  React.useEffect1(_ => {
    switch maybeConfig {
    | Some(config) => {
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
    }
    | None => Js.Console.log("no config!")
    }
    None
  }, [maybeConfig])

  let routerUrl = RescriptReactRouter.useUrl()

  switch maybeConfig {
  | None => <Pages_Configuration config=defaultConfig saveConfig />
  | Some(config) =>
    switch routerUrl.path {
    | list{"dsensum"} => <Pages_Sensations config />
    | list{"dsensum", "sanctuary"} => <Pages_NewSensation config/>
    | list{"dsensum", "graveyard"} => <Pages_Sensations config/>
    | list{"dsensum", "config"} => {
      <Pages_Configuration config saveConfig />
    }
    | _ => <Pages_NotFound />
    }
  }
}
