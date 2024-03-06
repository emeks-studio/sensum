module Sensation = {
  @react.component
  let make = (~index: int, ~sensation: Types.sensation) => {
    let (avatar, _) = State.Avatar.getAvatarFromIndex(sensation.avatar)
    let direction = mod(index, 2) == 0 ? "text-left" : "text-right"
    <article
      className="sensation text-purple-50 italic text-center border-b border-dashed border-purple-800 py-4">
      {sensation.message->React.string}
      <footer key={index->Belt.Int.toString} className={`${direction} non-italic`}>
        {avatar->React.string}
      </footer>
    </article>
  }
}
module SensationsBody = {
  @react.component
  let make = (~config: Types.config) => {
    let (sensations, loading, loadMore, lastUnloadedIndex) = State.Sensations.useSensations(~config)
    let showLoadMore = loading || Ethers.equalBigInt(lastUnloadedIndex, Ethers.toBigInt(-1))
    // FIXME: Make it responsive!
    <div className="flex flex-col flex-wrap">
      {sensations
      ->Belt.Array.mapWithIndex((index, sensation) => {
        <Sensation index sensation key={index->Belt.Int.toString} />
      })
      ->React.array}
      {loading
        ? <div className="flex mt-4 justify-end items-center">
            <div
              className="w-4 h-4 relative block rounded-lg before:rounded before:absolute before:inset-0 after:rounded-lg after:absolute after:inset-0 after:animate-soar before:shadow-soar after:shadow-soar-after"
            />
          </div>
        : React.null}
      {!loading && sensations->Belt.Array.length == 0
        ? <div className="flex justify-center my-5">
            <label className="text-md p-2 text-purple-50"> {"[NUMB]"->React.string} </label>
          </div>
        : React.null}
      <div className="flex mt-4 justify-end items-center">
        <div
          onClick={_ => loadMore()}
          className={`h-4 text-xl cursor-pointer gray ${showLoadMore ? "hidden" : "block"}`}>
          {"🙏"->React.string}
        </div>
      </div>
    </div>
  }
}

@react.component
let make = (~config: Types.config) => {
  <div className="bg-custom-gradient flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="overflow-auto hover:overflow-y-scroll max-w-3xl mx-auto py-16 px-8">
      <SensationsBody config />
    </main>
  </div>
}
