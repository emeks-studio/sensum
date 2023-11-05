
// TODO: Provide fetchMoreSensations method!
let useSensations = (~config: Types.config) => {
  let (sensations, setSensations) = React.useState(_ => list{})

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
    }
    None
   }, 
   [config]
  )

  (sensations)
}