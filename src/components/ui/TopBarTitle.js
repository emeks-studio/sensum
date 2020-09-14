import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Title
} from 'native-base';
import {
  ColorPalette,
  Typography
} from '../../../assets/styles/SensumTheme';

export const TopBarTitle = ({onPress}) => (
  <Body>
    <Button style={styles.headerButton} transparent onPress={() => onPress && onPress()}>
      <Title style={styles.headerText}> sensum </Title>
    </Button>
  </Body>
);

const styles = StyleSheet.create({
  'headerButton': {
    alignSelf: 'flex-end'    
  },
  'headerText': {
    color: ColorPalette.light,
    fontFamily: Typography.fontFamilyLight,  
  }
});
