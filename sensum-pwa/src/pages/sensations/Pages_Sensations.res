// TODO: See if this is still useful?
type sensationsIterator = IteratorNotReady | Iterator(Types.BigInt.t)

module SensationsBody = {
  @react.component
  let make = (
    ~sensations: list<Types.sensation>
  ) => {    
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
let make = (~config: Types.config) => {
  let (sensations/*, fetchMoreSensations*/) = State.Sensations.useSensations(~config);
  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar rightComponent={<Core.Ui.ConfigButton />} />
    <main className="overflow-y-scroll">
      <React.Suspense
        fallback={<div className="text-sm text-purple-50"> {"suspensed"->React.string} </div>}>
        <SensationsBody sensations/>
      </React.Suspense>
    </main>
  </div>
}
