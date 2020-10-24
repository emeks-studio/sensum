
import React, { useEffect } from "react";
import { Animated, Text } from "react-native";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { withTheming } from "../../util/theming";

const ToastComponent = ({ message, animValue = 0, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  if(!message) return null;
  return (
    <Animated.View style={styles.toastContainer(animValue)}>
        <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  toastContainer: anim => ({
    transform: [{translateY: anim}],
    position: 'absolute',
    backgroundColor: theme.colorPalette.info,
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    zIndex: 10
  }),
  toastText: {
    color: theme.colorPalette.light,
    fontFamily: theme.typography.fontFamilyLight,
    fontSize: 18,
    paddingHorizontal: 20
  }
}));

const Toast = withTheming(ToastComponent);

export {
  Toast
};
