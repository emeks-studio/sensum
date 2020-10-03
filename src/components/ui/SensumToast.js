import { Toast } from "native-base";

// params must provide property text
export function showToast(params) {
  const config = {
    position: "bottom",
    duration: 2500,
    style: style.notification,
    textStyle: style.text
  };
  Toast.show(Object.assign(config, params));
}

// FIXME: Use ThemeSheet!
const style = {
  notification: {
    backgroundColor: "black"
  },
  text: {
    fontFamily: "TitilliumWeb-Light"
  }
};
