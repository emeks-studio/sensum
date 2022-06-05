let sensationsIndex = Recoil.asyncSelector({
  key: "sensationsIndex",
  get: ({get}) => {
    /* Obs: We call State_Configuration instead of State.Configuration
     in order to avoid circular dependencies */
    let maybeConfig = get(State_Configuration.maybeConfigAtom)
    switch maybeConfig {
    | Some(config) =>
      Sensations.getSensationsLengthFormatted(~config)
      ->Promise.then(sensationIndex => {
        Js.Console.log2("getSensationsLengthFormatted::response", sensationIndex)
        Promise.resolve(Belt.Result.Ok(sensationIndex))
      })
      ->Promise.catch(err => {
        Js.Console.log2("getSensationsLengthFormatted::error", err)
        Promise.resolve(Belt.Result.Error("error getting sensation index"))
      })
    | None => Promise.resolve(Belt.Result.Error("no config"))
    }
  },
})
