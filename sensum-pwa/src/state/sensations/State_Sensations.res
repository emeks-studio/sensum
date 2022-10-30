
// TODO: Provide fetchMoreSensations method!
let useSensations = (~config: Types.config) => {
  let (sensations, setSensations) = React.useState(_ => list{})

  React.useEffect1(() => {
    Sensations.getSensationsLength(~config)
      ->Promise.then(sensationlength => {
        Js.Console.log2("getSensationsLength::response", sensationlength)
        let latestSensationIndex = Ethers.subBigInt(sensationlength, Ethers.toBigInt(1))
        Sensations.getSensationByIndex(~config, ~index=latestSensationIndex)
      })
      ->Promise.then(sensation => {
        Js.Console.log2("getSensationByIndex::response", sensation)
        setSensations(_ => list{sensation})
        Promise.resolve()
      })
      ->Promise.catch(err => {
        Js.Console.log2("useSensations::error", err)
        Promise.resolve()
      })->ignore
    None
   }, 
   [config]
  )

  (sensations)
}