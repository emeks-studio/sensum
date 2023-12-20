module SensationsBody = {
  @react.component
  let make = (
    ~config: Types.config
  ) => {    
    let (sensations, loading, loadMore, lastUnloadedIndex) = State.Sensations.useSensations(~config);
    // FIXME: Make it responsive!
    <div className="flex flex-col flex-wrap">
        {sensations->Belt.Array.mapWithIndex((index, sensation) => {
          let direction = (mod(index,2) == 0) ? "flex-row" : "flex-row-reverse"
          <div className=`flex ${direction} flex-nowrap bg-black` key={index->Belt.Int.toString}>
            // FIXME: Apply faces given the avatar id number
            //<div className="m-5 w-32 h-32 bg-red-100">{sensation.avatar->Types.BigInt.toString->React.string}</div>
            <div className="my-5 mx-1 w-28 h-28 bg-purple-900 flex items-center justify-center border-2 border-solid border-purple-50">
              <label className="text-4xl pb-1 text-purple-50">{State.Avatar.getAvatarFromIndex(sensation.avatar)->React.string} </label>
            </div>
            <div className="my-5 mx-1 h-28 flex-1 items-center justify-center overflow-auto border-2 border-dotted border-purple-50">
              <p className="text-lg text-purple-50 font-medium px-2">
                {sensation.message->React.string}
              </p>
            </div>
          </div>
        })->React.array}
        {loading ? 
          <div className="flex justify-center my-5">
            <label className="text-md p-2 text-purple-50">
              {"...LOADING..."->React.string} 
            </label>
          </div>
        : React.null
        }
        {!loading && sensations->Belt.Array.length == 0 ? 
          <div className="flex justify-center my-5">
            <label className="text-md p-2 text-purple-50">
              {"[NUMB]"->React.string} 
            </label>
          </div>
        : React.null
        }
        <div className="flex justify-center my-5">
          <button 
            className="text-md p-2 text-purple-50 border-2 border-solid border-purple-50  disabled:opacity-50 hover:bg-purple-900" 
            onClick={_ => loadMore()}
            disabled={loading || Ethers.equalBigInt(lastUnloadedIndex, Ethers.toBigInt(-1))}
          >
            {"READ MORE"->React.string}
          </button>
        </div>
    </div>
  }
}

@react.component
let make = (~config: Types.config) => {
  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="overflow-y-scroll">
     <SensationsBody config/>
    </main>
  </div>
}
