// TODO: See if this is still useful?
type sensationsIterator = IteratorNotReady | Iterator(Types.BigInt.t)

module SensationsBody = {
  @react.component
  let make = (
    ~sensations: list<Types.sensation>
  ) => {    
    <div className="flex flex-col flex-wrap">
        {sensations->Belt.List.mapWithIndex((index, sensation) => {
          let direction = (mod(index,2) == 0) ? "flex-row" : "flex-row-reverse"
          <div className=`flex ${direction} flex-nowrap bg-black` key={index->Belt.Int.toString}>
            <div className="m-5 w-32 h-32 bg-red-100">{sensation.avatar->Types.BigInt.toString->React.string}</div>
            <div className="m-5 w-full h-32 bg-yellow-400">
              <p className="text-lg text-purple-50 font-medium">
                {sensation.message->React.string}
              </p>
            </div>
          </div>
        })->Belt.List.toArray->React.array}
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
