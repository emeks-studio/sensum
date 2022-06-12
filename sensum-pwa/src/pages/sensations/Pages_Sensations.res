type sensationsIterator = IteratorNotReady | Iterator(Types.BigInt.t)

module SensationsBody = {
  @react.component
  let make = (~iterator: sensationsIterator, ~setIterator: (sensationsIterator => sensationsIterator) => unit) => {
    let sensationLength = Recoil.useRecoilValue(State.Sensations.length)
    let (sensations, setSensations) = State.Sensations.useSensations();
    React.useEffect1(() => {
      switch sensationLength {
      | Belt.Result.Ok(length) =>
        switch iterator {
        | IteratorNotReady => setIterator(_ => Iterator(length))
        | Iterator(_) => () // Suppose new sensations appears, we don't want to reboot the iterator.
        }
      | Belt.Result.Error(_) => ()
      }
      None
    }, [sensationLength])
    // TODO: Use special setSensations to request/fetch more!
    React.useEffect1(() => {
      switch iterator {
      | IteratorNotReady => ()
      | Iterator(it) => ()
      }
      None
    }, [iterator])
    
    <div>
      <h1 className="text-4xl text-purple-50">
        {sensations->Belt.List.mapWithIndex((index, sensations) => {
          <div key={index->Belt.Int.toString}>
            <h1 className="text-4xl text-purple-50"> {"element"->React.string} </h1>
          </div>
        })->Belt.List.toArray->React.array}
      </h1>
    </div>
  }
}

@react.component
let make = () => {
  let (iterator, setIterator) = React.useState(_ => IteratorNotReady)
  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar rightComponent={<Core.Ui.ConfigButton />} />
    <main className="overflow-y-scroll">
      <React.Suspense
        fallback={<div className="text-sm text-purple-50"> {"suspensed"->React.string} </div>}>
        <SensationsBody iterator setIterator/>
      </React.Suspense>
    </main>
  </div>
}
