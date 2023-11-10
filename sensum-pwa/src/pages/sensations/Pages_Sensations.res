// TODO: See if this is still useful?
type sensationsIterator = IteratorNotReady | Iterator(Types.BigInt.t)

module SensationsBody = {
  @react.component
  let make = (
    ~sensations: list<Types.sensation>
  ) => {    
    // FIXME: Make it responsive!
    <div className="flex flex-col flex-wrap">
        {sensations->Belt.List.mapWithIndex((index, sensation) => {
          let direction = (mod(index,2) == 0) ? "flex-row" : "flex-row-reverse"
          <div className=`flex ${direction} flex-nowrap bg-black` key={index->Belt.Int.toString}>
            // FIXME: Apply faces given the avatar id number
            //<div className="m-5 w-32 h-32 bg-red-100">{sensation.avatar->Types.BigInt.toString->React.string}</div>
            <div className="my-5 mx-1 w-28 h-28 bg-purple-900 flex items-center justify-center border-2 border-solid border-purple-50">
              <label className="text-4xl pb-1 text-purple-50">{State.Avatar.getAvatarFromIndex(sensation.avatar)->React.string} </label>
            </div>
            <div className="my-5 mx-1 w-full h-28 flex items-center justify-center border-2 border-dotted border-purple-50">
              <p className="text-lg text-purple-50 font-medium px-2">
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
  // let (sensations, fetchMoreSensations) = State.Sensations.useSensations(~config);
  let (sensations) = State.Sensations.useSensations(~config);
  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="overflow-y-scroll">
     <SensationsBody sensations />
    </main>
  </div>
}
