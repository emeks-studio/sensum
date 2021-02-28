open ReactNative

let getStylesBy = (~themeId: string) => {
  open Style
  ThemeSheet.unsafeCreate(~themeId, ~styleByThemeFn=theme =>
    {
      "container": viewStyle(
        ~justifyContent=#flexStart,
        ~alignItems=#center,
        ~margin=auto,
        ~backgroundColor=theme.colorPalette.dark,
        (),
      ),
      "text": textStyle(~fontFamily=theme.typography.fontFamilyLight, ()),
    }
  )
}

@react.component
let make = (~theming: Themes.theming) => {
  let themeId: string = theming.theme.id
  let styles = getStylesBy(~themeId=themeId)

  <View style={styles["container"]}>
    <Text style={styles["text"]}> {themeId->React.string} </Text>
    <Text> {"Powered by emeks"->React.string} </Text>
  </View>
}
