
// TODO: Provide fetchMoreSensations method!
let useSensations = (~config: Types.config) => {
  // let (sensationsIndex, setSensationsIndex) = React.useState(_ => Ethers.toBigInt(0))
  let (loading, setLoading) = React.useState(_ => true)
  let (sensations, setSensations) = React.useState(_ => list{})
  let provider = Ethers.getProvider(~networkUrl=config.networkUrl)

  React.useEffect1(() => {
    Js.Console.log2("useSensations::config", config)
    setLoading(_ => true)
    let p = async () => {
      try {
        let contract = Sensations.getContract(~config, ~provider)
        let sensationslength = await Sensations.getSensationsLength(~contract)
        Js.Console.log2("useSensations::getSensationsLength", sensationslength)
        let sensationsIndex = Ethers.subBigInt(sensationslength, Ethers.toBigInt(1))
        Js.Console.log2("useSensations::index", sensationslength)
        let indexes = Belt.Array.makeBy(4, (i) => Ethers.subBigInt(sensationsIndex, Ethers.toBigInt(i)))
                        -> Belt.Array.keep((i) => Ethers.greaterOrEqual(i, Ethers.toBigInt(0)))
        let results = indexes
                        ->Belt.Array.map(_, (index) => Sensations.getSensationByIndex(~contract, ~index))
                        ->Js.Promise.all
        let sensations = await results
        Js.Console.log2("useSensations::sensations", sensations)
        setSensations(_ => sensations->Belt.List.fromArray)
        setLoading(_ => false)
      } catch {
      | Js.Exn.Error(e) =>
         switch Js.Exn.message(e) {
         | Some(msg) => {
           Js.log("JS error thrown: " ++ msg)
           setLoading(_ => false)
         }
         | None => {
           Js.log("Some other exception has been thrown")
           setLoading(_ => false)
         }
         }
      }
    }
    p()->ignore
    None
   }, 
   [config]
  )

  (sensations, loading)
}