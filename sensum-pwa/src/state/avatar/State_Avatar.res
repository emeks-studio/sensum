// FIXME: Make a map of BigInt instead!
// module IntCmp = Belt.Id.MakeComparable({
//   type t = int
//   let cmp = (a, b) => Pervasives.compare(a, b)
// })

let optionsArray: array<(int, (string, string))> = [
  (0, ("◕‿◕", "text-3xl")),
  (1, ("◪_◪", "text-3xl")),
  (2, ("°▽°", "text-3xl")),
  (3, ("◔_◔", "text-3xl")),
  (4, ("・ω・", "text-3xl")),
  (5, ("◣_◢", "text-3xl")),
  (6, ("⌐■_■", "text-3xl")),
  (7, ("◉_◉", "text-3xl")),
  (8, ("◔̯◔", "text-3xl")),
  (9, ("⌒_⌒", "text-3xl")),
  (10, ("ʘ益ʘ", "text-3xl")),
  (11, ("ಥ_ಥ", "text-3xl")),
  (12, ("ಠ▃ಠ", "text-3xl")),
  (13, ("◡w◡", "text-3xl")),
  (14, ("▼ｪ▼", "text-3xl")),
  (15, ("ಠ_๏", "text-3xl")),
  (16, ("⚆_⚆", "text-3xl")),
  (17, ("ↁ_ↁ", "text-3xl")),
  (18, ("°□°", "text-3xl")),
  (19, ("Ф.Ф", "text-3xl")),
  (20, ("♥‿♥", "text-3xl")),
  (21, ("╭ರ_⊙", "text-3xl")),
  (22, ("◡ᴥ◡", "text-3xl")),
  (23, ("￣Д￣", "text-3xl")),
  (24, ("●_●", "text-3xl")),
  (25, ("Ò‸Ó", "text-3xl")),
  (26, ("︶︿︶", "text-3xl")),
  (27, ("ಠ﹏ಠ", "text-3xl")),
  (28, ("◔︿◔", "text-3xl")),
  (29, (".益.", "text-3xl")),
  (30, ("*‿*", "text-3xl")),
  (31, ("👽", "text-3xl")),
  (32, ("⌒ω⌒", "font-sans text-3xl")),
  (33, ("ʘ ͜ʖ ʘ", "font-sans text-3xl")),
  (34, ("ಠ_ಠ", "text-3xl")),
  (35, ("ಠิ﹏ಠิ", "text-3xl")),
  (36, ("ಠ⌣ಠ", "font-sans text-3xl")),
  (37, ("( ͡° ͜ʖ ͡°)", "font-sans text-3xl")),
  (38, ("´༎ຶٹ༎ຶ`", "font-sans text-3xl")),
  (39, ("￢_￢", "text-3xl")),
  (40, (" ͠° ͟ʖ ͡°", "font-sans text-3xl")),
  (41, (" ͠Ò ‸ Ó", "font-sans text-3xl")),
  (42, ("◣_◢ /", "text-2xl")),
  (43, ("◣_◢ —", "text-2xl")),
  (44, ("◣∩◢", "text-3xl")),
  (45, ("◣∀◢", "text-3xl")),
  (46, ("￢з￢", "text-3xl")),
  (47, ("ᔑ•ﺪ͟͠•ᔐ", "text-3xl")),
  (48, ("ლ,ᔑ•ﺪ͟͠•ᔐ.ლ", "font-sans text-xl")),
  (49, ("(｡◝‿◜｡)", "text-2xl")),
  (50, ("( ▀ ͜͞ʖ▀) =ε/̵͇̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿", "font-sans text-sm")),
  (51, ("̿̿ ̿̿ ̿̿ ̿'̿'̵͇̿з= ( ▀ ͜͞ʖ▀)", "font-sans text-sm")),
  (52, ("(ง︡'-'︠)ง", "font-sans text-4xl")),
  (53, ("( T____T)", "text-base")),
]

let optionsMap: Belt.Map.Int.t<(string, string)> = Belt.Map.Int.fromArray(optionsArray)

// FIXME: We need something better to transform from bigInt avatars indexes
let getAvatarFromIndex: Types.BigInt.t => (string, string) = avatarPos => {
  let index = avatarPos->Types.BigInt.toString->Belt.Int.fromString->Belt.Option.getWithDefault(0)
  let indexMod = mod(index, Belt.Map.Int.size(optionsMap))
  let (avatar, avatarCustomClass) = Belt.Map.Int.getExn(optionsMap, indexMod)
  Js.Console.log4(avatarPos, index, indexMod, avatar)
  (avatar, avatarCustomClass)
}
