import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { happyTheme, neutralTheme, angryTheme } from './Themes';

const build = themes => styleByThemeFn => {
  return _.fromPairs(
    _.map(themes, theme => {
      return [theme.id, StyleSheet.create(styleByThemeFn(theme))]  
    })
  );
};

const ThemeSheet = {};

// TODO: If we want to create a lib-style for this utility, we should receive themes from the outside.
const availableThemes = [happyTheme, neutralTheme, angryTheme]

// As for StyleSheet.create; Always keep style sheet code outside render method to provide better performance.
ThemeSheet.create = build(availableThemes);

export {
  ThemeSheet 
};
