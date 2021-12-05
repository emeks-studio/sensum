open ReactNative

let getStylesBy = (~themeId: string) => {
  open Style
  ThemeSheet.unsafeCreate(~themeId, ~styleByThemeFn=theme =>
    {
      "container": viewStyle(
        ~flex=1.0,
        ~justifyContent=#spaceEvenly,
        ~alignContent=#center,
        ~backgroundColor=theme.colorPalette.dark,
        (),
      ),
      "header": viewStyle(
        ~flex=1.0,
        ~margin=15.->dp,
        ~flexDirection=#row,
        ~justifyContent=#flexEnd,
        (),
      ),
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
      "closeButton": {
        "height": "32",
        "width": "32",
        "color": theme.colorPalette.light,
      },
      "text": textStyle(
        ~fontFamily=theme.typography.fontFamilyLight,
        ~color=theme.colorPalette.light,
        ~margin=9.->dp,
        ~fontSize=18.0,
        (),
      ),
      "brandText": textStyle(
        ~fontFamily=theme.typography.fontFamilyBold,
        ~color=theme.colorPalette.secondary,
        ~fontSize=18.0,
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

@react.component
let make = (~theming: Themes.theming, ~navigation) => {
  let themeId: string = theming.theme.id
  let styles = getStylesBy(~themeId)
  let showToast = Ui.Toast.useToast()

  let goBack = navigation["pop"]

  let showNetwork = () => {
    UserBinding.user.tryGatherAcolytes()->Js.Promise.then_(result => {
      switch result {
      | "" => showToast("ya guey! no insistas")
      | n => showToast(n ++ " electrones orbitando")
      }
    }, _)
  }

  let pickTheme = () => {
    let randomChoice = Js.Math.random_int(1, 5)
    switch randomChoice {
    | 1 => theming.setTheme(Themes.noConnectionTheme)
    | 2 => theming.setTheme(Themes.happyTheme)
    | 3 => theming.setTheme(Themes.neutralTheme)
    | 4 => theming.setTheme(Themes.angryTheme)
    | _ => theming.setTheme(Themes.noConnectionTheme) // It shouldn't be possible!
    }
  }

  <View style={styles["container"]}>
    <View style={styles["header"]}>
      <TouchableOpacity onPress={_ => goBack()->ignore}>
        <Ui.Icons.Close
          height={styles["closeButton"]["height"]}
          width={styles["closeButton"]["width"]}
          fill={styles["closeButton"]["color"]}
        />
      </TouchableOpacity>
    </View>
    <View style={styles["body"]}>
      <TouchableOpacity
        onPress={_ =>
          goOutside("https://github.com/emeks-studio/sensum-mobile#sensum-mobile")->ignore}>
        <Text style={styles["text"]}> {"Ir al repositorio oficial"->React.string} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={_ => goOutside("https://emeks.gitlab.io/sensum/lore/")->ignore}>
        <Text style={styles["text"]}> {"Ir al lore"->React.string} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={_ => showNetwork()->ignore}>
        <Text style={styles["text"]}>
          {"Contar electrones orbitando actualmente"->React.string}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={_ => pickTheme()->ignore}>
        <Text style={styles["text"]}> {"Cambiar estilo de la app"->React.string} </Text>
      </TouchableOpacity>
    </View>
    <View style={styles["footer"]}>
      <TouchableOpacity onPress={_ => goOutside("https://emeks.com.ar")->ignore}>
        <Text style={styles["brandText"]}> {"Impulsado por emeks"->React.string} </Text>
      </TouchableOpacity>
    </View>
  </View>
}
