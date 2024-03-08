type pickingAvatar = Picking | Selected((string, string)) | AboutToSelect

// (!) Do not use these keys in mainnet (!)
// The Messenger private key
let privateKey = "0x25aa6fec3324277deae6b4c934338fca5ef3940529f24d8cb77c7facebd51096"
// Hardhat private key
// let privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

module MessengerInfo = {
  @react.component
  let make = (~wallet: Types.wallet) => {
    let (balance, setBalance) = React.useState(() => None)
    React.useEffect0(() => {
      let p = async () => {
        try {
          let b = await Ethers.getWalletBalance(~wallet)
          setBalance(_ => Some(b))
        } catch {
        | Js.Exn.Error(e) =>
          switch Js.Exn.message(e) {
          | Some(msg) => Js.Console.log2("[error] getWalletBalance", msg)
          | None =>
            Js.Console.log2("[error] getWalletBalance", "Some other exception has been thrown")
          }
        }
      }
      p()->ignore
      None
    })
    <div className="flex flex-col">
      <label className="text-md text-purple-50 mx-1"> {"Messenger"->React.string} </label>
      <div className="flex flex-row flex-wrap mx-1 gap-2">
        <label className="truncate text-md text-purple-50">
          {"* Address: "->React.string}
          {wallet.address->React.string}
        </label>
      </div>
      <div className="flex flex-row flex-wrap mx-1 gap-2">
        <label className="truncate text-md text-purple-50">
          {"* Mana: "->React.string}
          {switch balance {
          | None => "..."->React.string
          | Some(b) =>
            `${b->Types.BigInt.toString} ${b->Types.BigInt.toString == "0"
                ? "(Pray for power!)"
                : ""}`->React.string
          }}
        </label>
      </div>
    </div>
  }
}

module CostInfo = {
  @react.component
  let make = (
    ~provider: Types.provider,
    ~contract: Types.contract,
    ~wallet: Types.wallet,
    ~sensation: Types.sensation,
  ) => {
    let (cost, setCost) = React.useState(() => None)
    let updateCost = async () => {
      let newCost = await Sensations.estimateCost(~provider, ~contract, ~wallet, ~sensation)
      setCost(_ => Some(newCost))
    }

    React.useEffect1(() => {
      updateCost()->ignore
      None
    }, [sensation])

    <div className="flex flex-row flex-wrap mx-1 gap-2">
      <label className="truncate text-md text-purple-50">
        {"* Estimated cost: "->React.string}
        {switch cost {
        | None => "..."->React.string
        | Some(c) => c->React.string
        }}
      </label>
    </div>
  }
}

@react.component
let make = (~config: Types.config) => {
  let provider = Ethers.getProvider(~networkUrl=config.networkUrl)
  let contract = Sensations.getContract(~config, ~provider)
  let wallet = Ethers.newWalletFromPrivateKey(~privateKey, ~provider)
  let (trasmittingSensation, setTransmittingSensation) = React.useState(() => false)
  let (sensation, setSensation) = React.useState(() => {
    Types.avatar: Ethers.toBigInt(0),
    Types.message: "",
  })
  let (pickingAvatar, setPickingAvatar) = React.useState(() => AboutToSelect)

  let onChangeSensationMessage = event => {
    let message = ReactEvent.Form.target(event)["value"]
    setSensation(prev => {...prev, Types.message})
  }

  // TODO: We could add info about estimated gas cost!

  let onTransmitSensation = async () => {
    if sensation.message == "" {
      Js.Console.log2("[error] onTransmitSensation", "sensation.message is empty")
    } else {
      setTransmittingSensation(_ => true)
      try {
        let confirmedTx = await Sensations.newSensation(~contract, ~sensation, ~wallet)
        setTransmittingSensation(_ => false)
        Js.Console.log2("[ok] onTransmitSensation::Sensations.newSensation", confirmedTx)
        RescriptReactRouter.replace("/graveyard")
      } catch {
      | Js.Exn.Error(e) => {
          setTransmittingSensation(_ => false)
          switch Js.Exn.message(e) {
          | Some(msg) =>
            Js.Console.log2("[error] onTransmitSensation::Sensations.newSensation", msg)
          | None =>
            Js.Console.log2(
              "[error] onTransmitSensation::Sensations.newSensation",
              "Some other exception has been thrown",
            )
          }
        }
      }
    }
  }

  <div className="bg-black flex flex-col h-screen overflow-hidden">
    <Core.Ui.Navbar />
    <main className="overflow-y-scroll">
      {switch pickingAvatar {
      | Picking =>
        <div className={`flex flex-row bg-black flex-wrap mx-5`}>
          {State.Avatar.optionsArray
          ->Belt.Array.map(option => {
            let (pos, (avatar, avatarCustomClass)) = option
            <button
              key={pos->Belt.Int.toString}
              className={`my-5 mx-1 w-28 h-28 bg-black flex items-center justify-center border-2 border-solid border-purple-50 px-1 text-purple-50 hover:bg-purple-900 ${avatarCustomClass}`}
              onClick={_ => {
                switch State.Avatar.optionsMap->Belt.Map.Int.get(pos) {
                | Some(avatar, avatarCustomClass) => {
                    setSensation(prevSensation => {
                      ...prevSensation,
                      Types.avatar: pos->Ethers.toBigInt,
                    })
                    setPickingAvatar(_ => Selected((avatar, avatarCustomClass)))
                  }
                | None => Js.Console.log("Error: Avatar not found")
                }
              }}>
              {avatar->React.string}
            </button>
          })
          ->React.array}
        </div>
      | AboutToSelect =>
        <div className={`flex flex-col bg-black`}>
          <div className={`flex flex-row flex-nowrap bg-black`}>
            <button
              className="my-3 mx-1 w-28 h-28 bg-black flex items-center justify-center border-2 border-solid border-purple-50 text-md px-5 opacity-50 text-purple-50 hover:bg-purple-900"
              onClick={_ => setPickingAvatar(_ => Picking)}>
              {"Pick Avatar"->React.string}
            </button>
            <textarea
              className={`my-3 mx-1 p-2 flex-1 h-28 form-control bg-black resize-none text-lg text-purple-50 font-medium justify-center border-2  border-dotted border-purple-50 focus:outline-none focus:border-purple-900`}
              id="newSensationMessage"
              placeholder="Write your feelings..."
              onChange=onChangeSensationMessage
              minLength=1
              maxLength=512
            />
          </div>
          <MessengerInfo wallet />
          <CostInfo provider contract wallet sensation />
          <button
            className="my-1 mx-1 bg-black items-center justify-center border-2 border-solid border-purple-50 text-md px-5 text-purple-50 disabled:opacity-50"
            disabled=true>
            {"TRANSMIT SENSATION"->React.string}
          </button>
        </div>
      | Selected((avatar, avatarCustomClass)) =>
        <div className={`flex flex-col bg-black`}>
          <div className={`flex flex-row flex-nowrap bg-black`}>
            <button
              className={`my-3 mx-1 w-32 h-28 bg-purple-900 flex items-center justify-center border-2 border-solid border-purple-50  px-1 text-purple-50 hover:bg-black ${avatarCustomClass}`}
              onClick={_ => setPickingAvatar(_ => Picking)}>
              {avatar->React.string}
            </button>
            <textarea
              className="my-3 mx-1 p-2 w-full h-28 form-control bg-black resize-none text-lg text-purple-50 font-medium justify-center border-2 border-dotted border-purple-50 focus:outline-none focus:border-purple-900"
              id="newSensationMessage"
              placeholder="Write your feelings..."
              value={sensation.message}
              onChange=onChangeSensationMessage
              minLength=1
              maxLength=512
            />
          </div>
          <MessengerInfo wallet />
          <CostInfo provider contract wallet sensation />
          <button
            className="my-1 mx-1 bg-black items-center justify-center border-2 border-solid border-purple-50 text-md px-5 text-purple-50 hover:bg-purple-900 disabled:opacity-50"
            onClick={_ => onTransmitSensation()->ignore}
            disabled={trasmittingSensation || sensation.message == ""}>
            {(trasmittingSensation ? "TRANSMITTING..." : "TRANSMIT SENSATION")->React.string}
          </button>
        </div>
      }}
    </main>
  </div>
}
