import { Toast } from "native-base";
import { ThemeSheet } from "../../../assets/styles/ThemeSheet";

// params must provide property text
export function showToast(params, theming) {
  const styles = stylesByTheme[theming.theme.id];
  const config = {
    position: "bottom",
    duration: 2500,
    style: styles.notification,
    textStyle: styles.text
  };
  Toast.show(Object.assign(config, params));
}

const stylesByTheme = ThemeSheet.create(theme => ({
  notification: {
    backgroundColor: theme.colorPalette.info
  },
  text: {
    fontFamily: theme.typography.fontFamilyLight
  }
}));
