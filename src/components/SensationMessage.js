import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { View, Text, Animated, Easing } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import { ThemeSheet } from "../assets/styles/ThemeSheet";

const useFading = (active=false) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const fading = useRef(
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 3500,
        isInteraction: false,
        useNativeDriver: true,
        easing: Easing.linear,
    }))
  ).current

  useEffect(()=>{
    const stopAnimation = () => {
      fading.stop();
      animationValue.setValue(0);
    };
    active ? fading.start() : stopAnimation();
    return stopAnimation;
  }, [active]);

  const opacity = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1]
  });
  return [opacity];
};
function isTrending(sensation) {
  const dislikes = sensation.dislikes === 0 ? 1 : sensation.dislikes;
  return sensation.likes >= dislikes * 5;
}
function shouldBeDenied(sensation) {
  return sensation.dislikes > sensation.likes;
}

const SensationMessageComponent = ({ model: { Sensations }, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  const sensation = Sensations.current;
  const [animValue] = useFading(isTrending(sensation));
  return (
    <>
      <Animated.View style={[styles.messageContainer, { opacity: animValue }]}>
        <ScrollView contentContainerStyle={styles.messageScrollContent}>
          <Text
            textBreakStrategy="balanced"
            allowFontScaling
            maxFontSizeMultiplier={2}
            adjustsFontSizeToFit
            style={styles.messageText(shouldBeDenied(sensation))}
          >
            {sensation.message}
          </Text>
        </ScrollView>
      </Animated.View>
      <View style={styles.authorView}>
        <Text style={styles.authorText}>{`~ ${sensation.author}`}</Text>
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

const SensationMessage = withTheming(
  withModel(observer(SensationMessageComponent))
);

export { SensationMessage };
