import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { withModel } from '../model-components';
import { showToast } from './ui';
import { ColorPalette } from '../../assets/styles/SensumTheme';

const TamagochiComponent = ({ model: { Oracle } }) => {

  const onPress = () => {
    Oracle.advanceLine();
    const newLine = Oracle.getLine;
    if (newLine) {
      showToast({text: newLine});
    }
  };
  
  return (
    <TouchableHighlight style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{Oracle.getFace}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
   buttonContainer: {
    position: 'relative',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorPalette.dark,
    borderColor: 'transparent',
    borderRadius: 16,
    shadowOpacity: 0.8,
    elevation: 6
  },
  text: {
    fontSize: 45,
    color: ColorPalette.light,
  }
});

const Tamagochi = withModel(observer(TamagochiComponent));

export {
  Tamagochi
};
