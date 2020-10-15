import React, { useRef, useState, useEffect } from "react";
import { Animated, Easing, Text } from "react-native";
import { observer } from 'mobx-react';
import { withModel } from '../model-components';
import { ThemeSheet } from '../assets/styles/ThemeSheet';
import { calculateMessageText } from '../util/styleHelpers';
import { withTheming } from "../util/theming";

// min opacity
// duration is in miliseconds
export const AnimatedSensationComponent = ({ model: { Sensations }, theming }) => {
  // animationValue will be used as the value for opacity. Initial Value: 0
  const animationValue = useRef(new Animated.Value(0.05)).current;
  const [max, setMax] = useState(1);
  const styles = stylesByTheme[theming.theme.id];
  const durationInMiliseconds = 2500;

  useEffect(() => {
    fadeingAnimation()
  }, [max])
  
  const fadeingAnimation = () => {
    Animated.timing(animationValue, {
      toValue: max,
      duration: durationInMiliseconds,
      easing: Easing.linear
    }).start(() => {
      if (max == 1) {
        setMax(0.05);
      } else {
        setMax(1);
      }
    });
  };

  return (
    <Animated.View style={{ opacity: animationValue }}>
      <Text
        textBreakStrategy="balanced"
        allowFontScaling
        maxFontSizeMultiplier={2}
        adjustsFontSizeToFit
        style={styles.message(
          Sensations.current.message.length,
          shouldBeDenied(Sensations.current),
          isTrending(Sensations.current)
        )}>
          {Sensations.current.message}
        </Text>
    </Animated.View>
  );
};

function isTrending(sensation) {
  const dislikes = (sensation.dislikes === 0) ? 1 : sensation.dislikes;
  return sensation.likes >= (dislikes * 5);
}

function shouldBeDenied(sensation) {
  return sensation.dislikes > sensation.likes;
}

const stylesByTheme = ThemeSheet.create(theme => ({
  message: (length, denied = false, trending = false) => ({
    marginTop: calculateMessageText(length),
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 23,
    fontFamily: theme.typography.fontFamilyLight,
    color: denied ? theme.colorPalette.secondary : theme.colorPalette.light,
    flexGrow: 1,
    textDecorationLine: denied ? 'line-through' : 'none'
  }),
}));

const AnimatedSensation = withTheming(withModel(observer(AnimatedSensationComponent)));

export {
  AnimatedSensation
};
