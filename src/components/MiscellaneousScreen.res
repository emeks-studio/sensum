open ReactNative
open Theme

@react.component
let make = (~theming: theming) => {
  let currentTheme: string = theming.theme.id
  <View>
    <Text> {currentTheme->React.string} </Text>
    <Text> {"Powered by emeks"->React.string} </Text>
  </View>
}
