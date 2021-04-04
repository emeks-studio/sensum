// type themeId = AngryTheme | NeutralTheme | HappyTheme | NoConnectionTheme

// let themeIdToString = (t: themeId): string => {
//   switch t {
//   | AngryTheme => "angryTheme"
//   | NeutralTheme => "neutralTheme"
//   | HappyTheme => "happyTheme"
//   | NoConnectionTheme => "noConnectionTheme"
//   }
// }

// let themeIdFromString = (s: string): themeId => {
//   switch s {
//   | "angryTheme" => AngryTheme
//   | "neutralTheme" => NeutralTheme
//   | "happyTheme" => HappyTheme
//   | "noConnectionTheme" => NoConnectionTheme
//   | _ => NoConnectionTheme
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

type theming = {theme: theme, setThemeBy: theme => unit}

let noConnectionTheme: theme = {
  id: "noConnectionTheme",
  colorPalette: {
    dark: "#F9F6FF",
    darker: "#B691FF",
    principal: "#CBAAFF",
    secondary: "#9773D1",
    info: "#CBAAFF", // Para las notificaciones todo oscuro quedaba chotis!
    light: "#271F34",
  },
  typography: {
    fontFamilyLight: "TitilliumWeb-Light",
    fontFamilyBold: "TitilliumWeb-Bold",
  },
}

let happyTheme: theme = {
  id: "happyTheme",
  colorPalette: {
    dark: "#271F34",
    darker: "#1f1829",
    principal: "#4B3968",
    secondary: "#9773D1",
    info: "#CBAAFF",
    light: "#F9F6FF",
  },
  typography: {
    fontFamilyLight: "TitilliumWeb-Light",
    fontFamilyBold: "TitilliumWeb-Bold",
  },
}

let neutralTheme: theme = {
  id: "neutralTheme",
  colorPalette: {
    dark: "#9773D1",
    darker: "#7242C0",
    principal: "#4B3968",
    secondary: "#271F34",
    info: "#CBAAFF",
    light: "#F9F6FF",
  },
  typography: {
    fontFamilyLight: "TitilliumWeb-Light",
    fontFamilyBold: "TitilliumWeb-Bold",
  },
}

let angryTheme: theme = {
  id: "angryTheme",
  colorPalette: {
    dark: "#A106F4",
    darker: "#8004C3",
    principal: "#4B3968",
    secondary: "#C407F7",
    info: "#D607F9",
    light: "#F9F6FF",
  },
  typography: {
    fontFamilyLight: "TitilliumWeb-Light",
    fontFamilyBold: "TitilliumWeb-Bold",
  },
}
