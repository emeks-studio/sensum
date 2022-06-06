let sensationsIndex = Recoil.asyncSelector({
  key: "sensationsIndex",
  get: ({get}) => {
    /* Obs: We call State_Configuration instead of State.Configuration
     in order to avoid circular dependencies */
    let maybeConfig = get(State_Configuration.maybeConfigAtom)
    switch maybeConfig {
    | Some(config) =>
      Sensations.getSensationsLength(~config)
      ->Promise.then(sensationIndex => {
        Js.Console.log2("getSensationsLength::response", sensationIndex)
        Promise.resolve(Belt.Result.Ok(sensationIndex))
      })
      ->Promise.catch(err => {
        Js.Console.log2("getSensationsLength::error", err)
        Promise.resolve(Belt.Result.Error("error getting sensation index"))
      })
    | None => Promise.resolve(Belt.Result.Error("no config"))
    }
  },
})
