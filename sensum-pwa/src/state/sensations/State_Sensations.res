let useSensations = (~config: Types.config) => {
  let (lastUnloadedIndex, setLastUnloadedIndex) = React.useState(_ => Ethers.toBigInt(-1))
  let (loading, setLoading) = React.useState(_ => true)
  let (sensations, setSensations) = React.useState(_ => [])
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
        let indexes = Belt.Array.makeBy(10, (i) => Ethers.subBigInt(sensationsIndex, Ethers.toBigInt(i)))
                        -> Belt.Array.keep((i) => Ethers.greaterOrEqualBigInt(i, Ethers.toBigInt(0)))
        let results = indexes
                        ->Belt.Array.map(_, (index) => Sensations.getSensationByIndex(~contract, ~index))
                        ->Js.Promise.all
        let sensations = await results
        Js.Console.log2("useSensations::sensations", sensations)
        setSensations(_ => sensations)
        setLoading(_ => false)
        setLastUnloadedIndex(_ => Ethers.subBigInt(indexes->Array.get(Array.length(indexes) - 1), Ethers.toBigInt(1)))
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
  let loadMore = () => {
    Js.Console.log2("loadMore::lastLoadedIndex", lastUnloadedIndex)
    if (Ethers.greaterOrEqualBigInt(lastUnloadedIndex, Ethers.toBigInt(0)) && !loading) {
      setLoading(_ => true)
      let p = async () => {
        try {
          let contract = Sensations.getContract(~config, ~provider)
          let indexes = Belt.Array.makeBy(5, (i) => Ethers.subBigInt(lastUnloadedIndex, Ethers.toBigInt(i)))
                          -> Belt.Array.keep((i) => Ethers.greaterOrEqualBigInt(i, Ethers.toBigInt(0)))
          let results = indexes
                          ->Belt.Array.map(_, (index) => Sensations.getSensationByIndex(~contract, ~index))
                          ->Js.Promise.all
          let sensations = await results
          Js.Console.log2("loadMore::sensations", sensations)
          setSensations(prevSensations => Belt.Array.concat(prevSensations, sensations))
          setLoading(_ => false)
          setLastUnloadedIndex(_ => Ethers.subBigInt(indexes->Array.get(Array.length(indexes) - 1), Ethers.toBigInt(1)))
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
    }
  }

  (sensations, loading, loadMore, lastUnloadedIndex)
}