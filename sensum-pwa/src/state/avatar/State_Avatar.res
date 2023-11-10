
// FIXME: Make a map of BigInt instead!
// module IntCmp = Belt.Id.MakeComparable({
//   type t = int
//   let cmp = (a, b) => Pervasives.compare(a, b)
// })

let optionsArray: array<(int, string)> = [
    (0, "◕‿◕"),
    (1, "◪_◪"),
    (2, "°▽°"),
    (3, "◔_◔"),
    (4, "・ω・"),
    (5, "◣_◢"),
    (6, "⌐■_■"),
    (7, "◉_◉"),
    (8, "◔̯◔"),
    (9, "⌒_⌒"),
    (10, "ʘ益ʘ"),
    (11, "ಥ_ಥ"),
    (12, "ಠ▃ಠ"),
    (13, "◡w◡"),
    (14, "▼ｪ▼"),
    (15, "ಠ_๏"),
    (16, "⚆_⚆"),
    (17, "ↁ_ↁ"),
    (18, "°□°"),
    (19, "Ф.Ф"),
    (20, "♥‿♥"),
    (21, "╭ರ_⊙"),
    (22, "◡ᴥ◡"),
    (23, "￣Д￣"),
    (24, "●_●"),
    (25, "Ò‸Ó"),
    (26, "︶︿︶"),
    (27, "ಠ﹏ಠ"),
    (28, "◔︿◔"),
    (29, ".益."),
    (30, "*‿*"),
    (31, "👽")
]

let optionsMap: Belt.Map.Int.t<string> = Belt.Map.Int.fromArray(optionsArray)

// FIXME: We need something better to transform from bigInt avatars indexes
let getAvatarFromIndex: Types.BigInt.t => string = (avatarPos) => {
  let index = avatarPos->Types.BigInt.toString->Belt.Int.fromString->Belt.Option.getWithDefault(0)
  let indexMod = mod(index, Belt.Map.Int.size(optionsMap))
  let avatar = Belt.Map.Int.getExn(optionsMap, indexMod)
  Js.Console.log4(avatarPos, index, indexMod, avatar)
  avatar
}