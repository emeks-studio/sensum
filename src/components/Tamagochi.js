import React from 'react';
import { observer } from 'mobx-react';
import { Text, TouchableHighlight } from 'react-native';
import { withModel } from '../model-components';
import { showToast } from './ui';
import { ThemeSheet } from '../assets/styles/ThemeSheet';
import { withTheming } from "../util/theming";

const TamagochiComponent = ({ model: { Oracle }, theming }) => {
  const styles = stylesByTheme[theming.theme.id];

  const onPress = () => {
    Oracle.advanceLine();
    const newLine = Oracle.getLine;
    if (newLine) {
      showToast({text: newLine}, theming);
    }
  };
  
  return (
    <TouchableHighlight style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{Oracle.getFace}</Text>
    </TouchableHighlight>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
   buttonContainer: {
    position: 'relative',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colorPalette.dark,
    borderColor: 'transparent',
    borderRadius: 16,
    shadowOpacity: 0.8,
    elevation: 6
  },
  text: {
    fontSize: 45,
    color: theme.colorPalette.light,
  }
}));

const Tamagochi = withTheming(withModel(observer(TamagochiComponent)));

export {
  Tamagochi
};
