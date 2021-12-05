import React, { useRef, useState, useEffect } from "react";
import { Animated, Easing } from "react-native";

// min opacity
// duration is in miliseconds
export const AnimatedFadingIcon = ({icon: Icon}) => {
  // animationValue will be used as the value for opacity. Initial Value: 0
  const durationInMiliseconds = 1500;
  const animationValue = useRef(new Animated.Value(0)).current;
  const [max, setMax] = useState(1);
  
  useEffect(() => {
    fadeingAnimation()
  }, [max])
  
  const fadeingAnimation = () => {
    Animated.timing(animationValue, {
      toValue: max,
      duration: durationInMiliseconds,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
      if (max == 1) {
        setMax(0);
      } else {
        setMax(1);
      }
    });
  };

  return (
    <Animated.View style={{ opacity: animationValue }}>
      <Icon />
    </Animated.View>
  );
};
