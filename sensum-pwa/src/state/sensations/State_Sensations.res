
// TODO: Provide fetchMoreSensations method!
let useSensations = (~config: Types.config) => {
  let (sensations, setSensations) = React.useState(_ => list{})
  let provider = Ethers.getProvider(~networkUrl=config.networkUrl)

  React.useEffect1(() => {
     Js.Console.log2("useSensations::config", config)
    if config.sensationsContractAddress == "mock" {
      let mockedSensations: list<Types.sensation> = list{
        {avatar: 1->Ethers.toBigInt, message: "something"},
        {avatar: 2->Ethers.toBigInt, message: "los granujas sean unidos porque esa es la ley primera"},
        {avatar: 3->Ethers.toBigInt, message: "somos los mismos de siempre ?"},
        {avatar: 1->Ethers.toBigInt, message: "something"},
        {avatar: 2->Ethers.toBigInt, message: "los granujas sean unidos porque esa es la ley primera"},
        {avatar: 3->Ethers.toBigInt, message: "somos los mismos de siempre ?"},
        {avatar: 1->Ethers.toBigInt, message: "something"},
        {avatar: 2->Ethers.toBigInt, message: "los granujas sean unidos porque esa es la ley primera"},
        {avatar: 3->Ethers.toBigInt, message: "somos los mismos de siempre ?"},
        {avatar: 1->Ethers.toBigInt, message: "something"},
        {avatar: 2->Ethers.toBigInt, message: "los granujas sean unidos porque esa es la ley primera"},
        {avatar: 3->Ethers.toBigInt, message: "somos los mismos de siempre ?"},
        {avatar: 1->Ethers.toBigInt, message: "something"},
        {avatar: 2->Ethers.toBigInt, message: "los granujas sean unidos porque esa es la ley primera"},
        {avatar: 3->Ethers.toBigInt, message: "somos los mismos de siempre ?"},
      }
      setSensations(_ => mockedSensations)
    } else {
      let p = async () => {
       try {
        let contract = Sensations.getContract(~config, ~provider)
        let sensationlength = await Sensations.getSensationsLength(~contract)
        Js.Console.log2("getSensationsLength::response", sensationlength)
        let latestSensationIndex = Ethers.subBigInt(sensationlength, Ethers.toBigInt(1))
        Js.Console.log2("latestSensationIndex", latestSensationIndex)
        let sensation = await Sensations.getSensationByIndex(~contract, ~index=latestSensationIndex)
        Js.Console.log2("getSensationByIndex::response", sensation)
        setSensations(_ => list{sensation})
       } catch {
       | Js.Exn.Error(e) =>
          switch Js.Exn.message(e) {
          | Some(msg) => {
            Js.log("JS error thrown: " ++ msg)
          }
          | None => Js.log("Some other exception has been thrown")
          }
       }
      }
      p()->ignore
    }
    None
   }, 
   [config]
  )

  (sensations)
}