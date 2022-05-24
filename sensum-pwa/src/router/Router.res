// Ref. https://rescript-lang.org/docs/react/latest/router#basic-example
@react.component
let make = () => {
  // Notice that for reads is ok/safe to just use directly the atom.
  // But for writes, we should use some of the exposed hooks.
  let maybeConfig = Recoil.useRecoilValue(State.Configuration.maybeConfigAtom)
  React.useEffect1(_ => {
    switch maybeConfig {
    | Some(config) =>
      Ethers.getNetwork(~networkUrl=config.networkUrl)
      ->Promise.then(status => {
        Js.Console.log2("getNetwork::response", status)
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
      
      Sensations.getLatestSensation(~config=config)
       ->Promise.then(sensation => {
        Js.Console.log2("getLatestSensation::response", sensation)
        Promise.resolve()
      })
      ->Promise.catch(err => {
        Js.Console.log2("getLatestSensation::error", err)
        Promise.resolve()
      })->ignore
      
    | None => Js.Console.log("no network url!")
    }
    None
  }, [maybeConfig])

  let routerUrl = RescriptReactRouter.useUrl()

  switch maybeConfig {
  | None => <Pages_Configuration />
  | _ =>
    switch routerUrl.path {
    | list{} => <Pages_Sensations />
    | list{"sensations"} => <Pages_Sensations />
    | list{"config"} => <Pages_Configuration />
    | _ => <Pages_NotFound />
    }
  }
}
