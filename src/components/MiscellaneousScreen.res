open ReactNative

let getStylesBy = (~themeId: string) => {
  open Style
  ThemeSheet.unsafeCreate(~themeId, ~styleByThemeFn=theme =>
    {
      "container": viewStyle(
        ~flex=1.0,
        ~justifyContent=#spaceEvenly,
        ~alignContent=#center,
        ~alignItems=#center,
        ~backgroundColor=theme.colorPalette.dark,
        (),
      ),
      "header": viewStyle(~flex=1.0, ~justifyContent=#flexStart, ()),
      "body": viewStyle(
        ~flex=3.0,
        ~justifyContent=#center,
        ~alignContent=#center,
        ~alignItems=#center,
        (),
      ),
      "footer": viewStyle(
        ~flex=1.0,
        ~justifyContent=#center,
        ~alignContent=#center,
        ~alignItems=#center,
        (),
      ),
      "text": textStyle(
        ~fontFamily=theme.typography.fontFamilyLight,
        ~color=theme.colorPalette.light,
        (),
      ),
    }
  )
}

let goOutside: string => Js.Promise.t<unit> = url => {
  Linking.canOpenURL(url)->Js.Promise.then_(canOpen => {
    if canOpen == true {
      Linking.openURL(url)
    } else {
      Js.log("TODO: Use a toast notification in order to notify the user!")
      Js.Promise.resolve()
    }
  }, _)
}

// TODO LIST:
// header with back button!
// add icons for the outside buttons
// styles for the actions
// improve "emeks" link style
// change theme v1: Random temporal theme
// change theme v2: Store user election in local storage
// FIXME: Rescript support for special characters!

@react.component
let make = (~theming: Themes.theming) => {
  let themeId: string = theming.theme.id
  let styles = getStylesBy(~themeId)
  let showToast = Ui.Toast.useToast()

  let showNetwork = () => {
    UserBinding.user.tryGatherAcolytes()->Js.Promise.then_(result => {
      switch result {
      | "" => showToast("ya guey! no insistas")
      | n => showToast(n ++ " electrones orbitando")
      }
    }, _)
  }
  
  <View style={styles["container"]}>
    <View style={styles["header"]}>
      <TouchableOpacity
        onPress={_ =>
          goOutside("https://github.com/emeks-studio/sensum-mobile#sensum-mobile")->ignore}>
        <CloseIcon theming />
      </TouchableOpacity>
    </View>
    <View style={styles["body"]}>
      <TouchableOpacity
        onPress={_ =>
          goOutside("https://github.com/emeks-studio/sensum-mobile#sensum-mobile")->ignore}>
        <Text style={styles["text"]}> {"Official repository"->React.string} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={_ => goOutside("https://emeks.gitlab.io/sensum/lore/")->ignore}>
        <Text style={styles["text"]}> {"sensum lore"->React.string} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={_ => showNetwork()->ignore}>
        <Text style={styles["text"]}>
          {"Contar electrones que orbitan actualmente!"->React.string}
        </Text>
      </TouchableOpacity>
      <Text style={styles["text"]}> {"Cambiar estilo de la app!"->React.string} </Text>
    </View>
    <View style={styles["footer"]}>
      <TouchableOpacity onPress={_ => goOutside("https://emeks.com.ar")->ignore}>
        <Text style={styles["text"]}> {"Powered by emeks"->React.string} </Text>
      </TouchableOpacity>
    </View>
  </View>
}
