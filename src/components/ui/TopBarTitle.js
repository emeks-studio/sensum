import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { observer } from 'mobx-react';
import { Body, Button, Title } from "native-base";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { withTheming } from "../../util/theming";

const TopBarTitleComponent = ({ onPress, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  return (
    <View>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => onPress && onPress()}
      >
        <Text style={styles.headerText}> sensum </Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  headerButton: {
    alignSelf: "center"
  },
  headerText: {
    color: theme.colorPalette.light,
    fontFamily: theme.typography.fontFamilyLight
  }
}));

const TopBarTitle = withTheming(observer(TopBarTitleComponent));

export {
  TopBarTitle
};
