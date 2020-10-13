import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { observer } from 'mobx-react';
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { withTheming } from "../../util/theming";

const TopBarTitleComponent = ({ onPress, theming, style }) => {
  const styles = stylesByTheme[theming.theme.id];
  return (
    <View style={[styles.titleBar, style]}>
      <TouchableOpacity
        onPress={() => onPress && onPress()}
      >
        <Text style={styles.headerText}> sensum </Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  titleBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: theme.colorPalette.light,
    fontFamily: theme.typography.fontFamilyLight,
    fontSize: 18
  }
}));

const TopBarTitle = withTheming(observer(TopBarTitleComponent));

export {
  TopBarTitle
};
