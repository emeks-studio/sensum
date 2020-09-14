import {
  Toast
} from 'native-base';
import {
  ColorPalette,
  Typography
} from '../../../assets/styles/SensumTheme';

// params must provide property text
export function showToast(params) {
  const config = {
    position: 'bottom',
    duration: 2500,
    style: style.notification,
    textStyle: style.text
  };
  Toast.show(Object.assign(config, params));
}

const style = {
  'notification': {
    backgroundColor: ColorPalette.info
  },
  'text': {
    fontFamily: Typography.fontFamilyLight
  }
};
