// Original version in raw JS

import _ from 'lodash';
import { StyleSheet } from 'react-native';
// Notice that here we are re-using generated code from rescript!
import {
  noConnectionTheme,
  happyTheme,
  neutralTheme,
  angryTheme
} from './Themes.bs.js'

const build = themes => styleByThemeFn => {
  return _.fromPairs(
    _.map(themes, theme => {
      return [theme.id, StyleSheet.create(styleByThemeFn(theme))]  
    })
  );
};

const ThemeSheet = {};

// TODO: If we want to create a lib-style for this utility, we should receive themes from the outside.
const availableThemes = [noConnectionTheme, happyTheme, neutralTheme, angryTheme]

// As for StyleSheet.create; Always keep style sheet code outside render method to provide better performance.
ThemeSheet.create = build(availableThemes);

export {
  ThemeSheet,
}
