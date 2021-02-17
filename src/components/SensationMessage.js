import React, { useRef, useEffect } from "react";
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import { observer } from "mobx-react";
import { View, Text, Animated, Easing } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import { ThemeSheet } from "../assets/styles/ThemeSheet";

const useFadingRef = () => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const fadingRef = useRef(animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1]
  }));

  const fading = useRef(
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: false,
        isInteraction: false,
        easing: Easing.linear,
    }), {
    useNativeDriver: false,
  })
  ).current

  useEffect(()=>{
    fading.start();
  });
  
  return [fadingRef];
};

const SensationMessageComponent = ({ model: { Sensations }, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  const [fadingRef] = useFadingRef();
  return (
    <>
      <Animated.View
        style={Sensations.isTrending ?
          [styles.messageContainer, { opacity: fadingRef.current }]:
          styles.messageContainer}>
        <ScrollView contentContainerStyle={styles.messageScrollContent}>
          <Text
            textBreakStrategy="balanced"
            allowFontScaling
            maxFontSizeMultiplier={2}
            adjustsFontSizeToFit
            style={styles.messageText(Sensations.shouldBeDenied)}
          >
            {Sensations?.current?.message}
          </Text>
        </ScrollView>
      </Animated.View>
      <View style={styles.authorView}>
        <Text style={styles.authorText}>{`~ ${Sensations?.current?.author}`}</Text>
      </View>
    </>
  );
};

const stylesByTheme = ThemeSheet.create((theme) => ({
  messageContainer: {
    width: "100%",
    flex: 1,
  },
  messageScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  messageText: (denied = false) => ({
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 23,
    fontFamily: theme.typography.fontFamilyLight,
    color: denied ? theme.colorPalette.secondary : theme.colorPalette.light,
    textDecorationLine: denied ? "line-through" : "none",
  }),
  authorView: {
    height: 64,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 30,
  },
  authorText: {
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    textAlign: "right",
    fontSize: 18,
  },
}));

const SensationMessage = (withTheming(
  withModel(observer(SensationMessageComponent))
));

export { SensationMessage };
