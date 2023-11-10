type pickingAvatar = Picking | Selected(string) | AboutToSelect

@react.component
let make = (~config: Types.config) => {
  let (sensation, setSensation) = React.useState(() => {Types.avatar: Ethers.toBigInt(0), Types.message: ""})
  let (pickingAvatar, setPickingAvatar) = React.useState(() => AboutToSelect)

   let onChangeSensationMessage = event => {
     let message = ReactEvent.Form.target(event)["value"]
     setSensation(prev => {...prev, Types.message: message})
   }

  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="overflow-y-scroll">
      {switch (pickingAvatar) {
      | Picking => 
        <div className=`flex flex-row bg-black flex-wrap mx-5`>
          {State.Avatar.optionsArray
            ->Belt.Array.map(option => {
              let (pos, avatar) = option
                  <button
                    key={pos->Belt.Int.toString}
                    className="my-5 mx-1 w-28 h-28 bg-black flex items-center justify-center border-2 border-solid border-purple-50 text-4xl px-5 text-purple-50 hover:bg-purple-900"
                    onClick={_ => {
                      switch State.Avatar.optionsMap->Belt.Map.Int.get(pos) {
                        | Some(avatar) => {
                          setSensation(prevSensation => { ...prevSensation, Types.avatar: pos->Ethers.toBigInt })
                          setPickingAvatar(_ => Selected(avatar))
                        }
                        | None => Js.Console.log("Error: Avatar not found")
                      }
                    }}
                  >
                    {avatar->React.string}
                  </button>
              })->React.array
          }
        </div>
      | AboutToSelect =>
        <div className=`flex flex-row flex-nowrap bg-black`>
            <button
              className="my-5 mx-1 w-28 h-28 bg-black flex items-center justify-center border-2 border-solid border-purple-50 text-md px-5 text-purple-50 hover:bg-purple-900"
              onClick={_ => setPickingAvatar(_ => Picking)}
            >
              {"Pick Avatar"->React.string}
            </button>
            // FIXME: On focus, there is an extra blue border! We should just change the color of the border we already have
            // FIXME: Adjust placeholder text color and position
            <textarea
              className="my-5 mx-1 w-full h-28 form-control bg-black resize-none text-lg text-purple-50 font-medium justify-center border-2 border-dotted border-purple-50 focus:border-none"
              id="newSensationMessage"
              placeholder="Write your feelings..."
              onChange=onChangeSensationMessage
            />
        </div>
      | Selected(avatar) =>
        <div className=`flex flex-row flex-nowrap bg-black`>
          <button
            className="my-5 mx-1 w-28 h-28 bg-purple-900 flex items-center justify-center border-2 border-solid border-purple-50 text-4xl px-5 text-purple-50 hover:bg-black"
            onClick={_ => setPickingAvatar(_ => Picking)}
          >
            {avatar->React.string}
          </button>
          // FIXME: On focus, there is an extra blue border! We should just change the color of the border we already have
          // FIXME: Adjust placeholder text color and position
          <textarea
            className="my-5 mx-1 w-full h-28 form-control bg-black resize-none text-lg text-purple-50 font-medium justify-center border-2 border-dotted border-purple-50 focus:border-none"
            id="newSensationMessage"
            placeholder="Write your feelings..."
            value={sensation.message}
            onChange=onChangeSensationMessage
          />
        </div>
      }} 
    </main>
  </div>
}
