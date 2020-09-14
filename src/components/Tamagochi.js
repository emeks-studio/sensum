import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Button } from 'native-base';
import { showToast } from './ui';
import { ColorPalette } from '../../assets/styles/SensumTheme';
import Oracle from '../model/Oracle';

const Tamagochi = observer(() => {

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
});

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

export {
  Tamagochi
};
