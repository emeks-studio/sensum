open ReactNative

let build = (~styleByThemeFn: Themes.theme => Js.t<'a>): Belt.Map.String.t<Js.t<'a>> => {
  // Fixme: We could pass this as a parameter!
  let themes: list<Themes.theme> = list{
    Themes.noConnectionTheme,
    Themes.happyTheme,
    Themes.neutralTheme,
    Themes.angryTheme,
  }

  let stylesByThemeId: Belt.Map.String.t<Js.t<'a>> = Belt.Map.String.empty

  Belt.List.reduce(themes, stylesByThemeId, (acc, theme) =>
    Belt.Map.String.set(acc, theme.id, StyleSheet.create(styleByThemeFn(theme)))
  )
}

let unsafeGet = (stylesByThemeId: Belt.Map.String.t<Js.t<'a>>, themeId: string): Js.t<'a> =>
  Belt.Map.String.getExn(stylesByThemeId, themeId)

let unsafeCreate = (~themeId: string, ~styleByThemeFn: Themes.theme => Js.t<'a>): Js.t<'a> => {
  let stylesByThemeId = build(~styleByThemeFn)
  unsafeGet(stylesByThemeId, themeId)
}
