// type themeId = AngryTheme | NeutralTheme | HappyTheme | NoConnectionTheme
// let themeIdToString = (t: themeId): string => {
//   switch t {
//   | AngryTheme => "angryTheme"
//   | NeutralTheme => "neutralTheme"
//   | HappyTheme => "happyTheme"
//   | NoConnectionTheme => "noConnectionTheme"
//   }
// }

type colorPalette = {
  dark: string,
  darker: string,
  principal: string,
  secondary: string,
  info: string,
  light: string,
}

type typography = {
  fontFamilyLight: string,
  fontFamilyBold: string,
}

type theme = {
  id: string,
  colorPalette: colorPalette,
  typography: typography,
}

type theming = {theme: theme}