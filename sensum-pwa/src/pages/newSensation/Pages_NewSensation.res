type avatarType = (int, (string, string))
type pickingAvatar = NoneSelected | Selected(avatarType)

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

    <div className="text-[0.7rem] text-[#c1bbbd]">
      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#b0e0e6]">
        {"✦ "->React.string}
        <span>
          {switch balance {
          | None => "..."->React.string
          | Some(b) =>
            `${b->Types.BigInt.toString} ${b->Types.BigInt.toString == "0"
                ? "(Pray for power!)"
                : ""}`->React.string
          }}
        </span>
      </div>
      <div className="overflow-hidden whitespace-nowrap overflow-ellipsis text-[#708090]">
        {"✎ "->React.string}
        <span> {wallet.address->React.string} </span>
      </div>
      <button
        className="border-t divide-y cursor-pointer text-[#c1bbbd] bg-transparent outline-0 tracking-[0.5rem] p-2 w-full hover:text-[#dda0dd]">
        {"TRANSMIT"->React.string}
      </button>
    </div>
  }
}

module Facet = {
  @react.component
  let make = (
    ~avt: avatarType,
    ~setPickingAvatar: (pickingAvatar => pickingAvatar) => unit,
    ~isSelected: bool,
  ) => {
    let (pos, (avatar, avatarCustomClass)) = avt

    <div
      className={`inline-block text-center w-13 overflow-hidden text-[0.7rem] text-[#c1bbbd] cursor-pointer ${avatarCustomClass} hover:text-[#dda0dd] ${isSelected
          ? "border-solid border-[#581185] border rounded"
          : ""}`}
      onClick={_ => {
        switch State.Avatar.optionsMap->Belt.Map.Int.get(pos) {
        | Some(avatar, avatarCustomClass) =>
          setPickingAvatar(_ => Selected((pos, (avatar, avatarCustomClass))))
        | None => Js.Console.log("error avatar not found")
        }
      }}>
      {avatar->React.string}
    </div>
  }
}

module Facets = {
  @react.component
  let make = (
    ~pickingAvatar: pickingAvatar,
    ~setPickingAvatar: (pickingAvatar => pickingAvatar) => unit,
  ) => {
    let isSelected = pos =>
      switch pickingAvatar {
      | Selected((selected, _)) => selected == pos
      | NoneSelected => false
      }

    <div className="flex flex-row gap-3 justify-around items-center flex-wrap mb-8">
      {State.Avatar.optionsArray
      ->Belt.Array.map(avt => {
        let (pos, _) = avt
        <Facet key={pos->Belt.Int.toString} avt setPickingAvatar isSelected={isSelected(pos)} />
      })
      ->React.array}
    </div>
  }
}

module NewSensationBox = {
  @react.component
  let make = (
    ~config: Types.config,
    ~pickingAvatar: pickingAvatar,
    ~setPickingAvatar: (pickingAvatar => pickingAvatar) => unit,
  ) => {
    <section className="block py-8 px-0 text-purple-50">
      <label className="mb-1"> {"Sensation"->React.string} </label>
      <textarea
        className="box-border italic bg-transparent outline-0 text-white w-full text-sm border-dotted border border-[#581185] p-2 mb-1 resize-none "
        rows={3}
        minLength={1}
        maxLength={512}
        placeholder="Express your feelings..."
      />
      <Facets pickingAvatar setPickingAvatar />
    </section>
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
  let (pickingAvatar, setPickingAvatar) = React.useState(() => NoneSelected)

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
        RescriptReactRouter.replace("/dsensum/graveyard")
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

  <div className="bg-custom-gradient h-screen overflow-hidden hover:overflow-y-scroll">
    <main className="py-16 px-8  mx-auto my-0 max-w-3xl ">
      <div className="flex flex-col ">
        <Core.Ui.Navbar />
        <NewSensationBox config setPickingAvatar pickingAvatar />
        <MessengerInfo wallet />
      </div>
    </main>
  </div>
}
