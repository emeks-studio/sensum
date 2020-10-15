import React, {useRef} from "react";
import { observer } from "mobx-react";
import { 
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Easing,
  Animated
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
import { ThemeSheet } from "../assets/styles/ThemeSheet";
import { showToast } from "./ui";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import SensumLogo from "../assets/svgs/Logo";
import ControlBack from "../assets/svgs/controlBack.svg";
import ControlForward from "../assets/svgs/controlForward.svg";
import ControlPlus from "../assets/svgs/controlPlus.svg";
import ControlMinus from "../assets/svgs/controlMinus.svg";
import EyeIcon from "../assets/svgs/eye.svg";

function isTrending(sensation) {
  const dislikes = sensation.dislikes === 0 ? 1 : sensation.dislikes;
  return sensation.likes >= dislikes * 5;
}
function shouldBeDenied(sensation) {
  return sensation.dislikes > sensation.likes;
}

const SensationItemComponent = ({ model: { Sensations }, theming }) => {
  const styles = stylesByTheme[theming.theme.id];

  const vote = function(item, vote) {
    Sensations.vote(item, vote)
      .then(success => {
        let text;
        if (success) text = vote ? "Ionizando [+++]" : "Ionizando [---]";
        else text = "¡Sobrecargas en el núcleo!";
        showToast({ text }, theming);
        // Sensations.next();
      })
      .catch(err => {
        console.debug(`[SensationItem::vote] Error: ${err}`);
        showToast({ text: "El Oráculo está ocupado balanceando el núcleo" }, theming);
      });
  };
  
  // This could be its own component
  const Controls = () => { 
    const minus = () => vote(Sensations.current, false);
    const plus = () => vote(Sensations.current, true);
    const prev = () => Sensations.back();
    const next = () => Sensations.next();
    return (
      <View style={styles.controlsBar}>
        <View style={styles.controlsSection}>
          <TouchableOpacity style={styles.controlsButton} onPress={minus}>
            <ControlMinus
              style={styles.controlsIcon(true)}
              fill={styles.controlsIcon(true).color}
            />
            <Text
              style={styles.controlsText(true)}
            >{Sensations.current.dislikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlsButton} onPress={plus}>
            <ControlPlus
              style={styles.controlsIcon()}
              fill={styles.controlsIcon().color}
            />
            <Text
              style={styles.controlsText()}
            >{Sensations.current.likes}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlsSection}>
          <TouchableOpacity style={styles.controlsButton} onPress={prev}>
            <ControlBack
              style={styles.controlsIcon()}
              fill={styles.controlsIcon().color}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlsButton} onPress={next}>
            <ControlForward
              style={styles.controlsIcon()}
              fill={styles.controlsIcon().color}
            />
          </TouchableOpacity>
        </View>
      </View>
  )};

  // TODO: This should be its own component
  const Sensation = ({sensation}) => {
    const animationValue = useRef(new Animated.Value(1)).current;
    const fadingAnimation = (val = 0) => {
      Animated.timing(animationValue, {
        toValue: val,
        duration: 2500,
        easing: Easing.linear
      }).start(() => fadingAnimation(1 - val));
    };
    isTrending(sensation) && fadingAnimation();
    return (
      <>
        <Animated.View style={[styles.messageView, { opacity: animationValue }]}>
          <ScrollView contentContainerStyle={styles.messageScrollContent}>
            <Text
              textBreakStrategy="balanced"
              allowFontScaling
              maxFontSizeMultiplier={2}
              adjustsFontSizeToFit
              style={styles.messageText(shouldBeDenied(sensation))}
              >{sensation.message}</Text>
          </ScrollView>
        </Animated.View>
        <View style={styles.authorView}>
          <Text style={styles.authorText}>{`~ ${sensation.author}`}</Text>
        </View>
      </>
    )
  }

  const renderLoading = () => {
    return (
    <View style={styles.rootContainer}>
        <View style={styles.sensationContainer}>
          <SensumLogo slice circleOpacity={0} style={styles.logoBackground}/>
        </View>
        <View style={styles.controlsContainer}>
          <ActivityIndicator
            size="large"
            color={theming.theme.colorPalette.light}
          />
        </View>
      </View>
    )
  };

  const renderError = () => {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.sensationContainer}>
          <SensumLogo slice circleOpacity={0} style={styles.logoBackground}/>
          <Text style={styles.messageText()}>జ్ఞ‌ా</Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlsButton}
            onPress={() => Sensations.getMoreSensations()}
          >
            <EyeIcon
              style={styles.controlsIcon()}
              fill={styles.controlsIcon().color}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderItem = () => {
    return (
      <View style={styles.rootContainer}>
        <GestureRecognizer
          onSwipeRight={() => Sensations.back()}
          onSwipeLeft={() => Sensations.next()}
          config={{velocityThreshold: 0.3, directionalOffsetThreshold: 50}}
          style={styles.sensationContainer}
        >
          <SensumLogo slice circleOpacity={0} style={styles.logoBackground}/>
          <Sensation sensation={Sensations.current}/>
        </GestureRecognizer>
        <View style={styles.controlsContainer}>
          <Controls/>
        </View>
      </View>
    )
  }

  if (Sensations.loading) {
    return renderLoading();
  } else {
    if (Sensations.error || Sensations.length === 0) {
      showToast({ text: "😴  El Oráculo duerme un sueño imposible" }, theming);
      return renderError();
    }
    return renderItem();
  }
};

const stylesByTheme = ThemeSheet.create(theme => ({
  rootContainer: {
    flex: 1
  },
  // Sensation
  sensationContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    position: 'absolute',
    width: '110%',
    height: 200,
    color: theme.colorPalette.darker
  },
  messageView: {
    width: "100%",
    flex: 1
  },
  messageScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 20,
    paddingTop: 20
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
    paddingHorizontal: 20
  },
  authorText: {
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    textAlign: "right",
    fontSize: 18
  },
  authorContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  // Controls
  controlsContainer: {
    flex: 1,
    backgroundColor: theme.colorPalette.darker,
    justifyContent: 'center'
  },
  controlsBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 20
  },
  controlsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexBasis: "45%"
  },
  controlsButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-evenly',
    flexBasis: 64,
    height: 64
  },
  controlsIcon: (alt = false) => ({
    color: alt ? theme.colorPalette.secondary : theme.colorPalette.light,
    height: 32,
    width: 32
  }),
  controlsText: (alt = false) => ({
    color: alt ? theme.colorPalette.secondary : theme.colorPalette.light,
    fontSize: 18
  })
}));

const SensationItem = withTheming(withModel(observer(SensationItemComponent)));

export { SensationItem };
