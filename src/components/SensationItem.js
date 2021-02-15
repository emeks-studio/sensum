import React from "react";
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import { observer } from "mobx-react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { SensationControls } from "./SensationControls";
import { SensationMessage } from "./SensationMessage";
import { ThemeSheet } from "../assets/styles/ThemeSheet";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import { useToast } from "./ui";
import SensumLogo from "../assets/svgs/Logo";
import EyeIcon from "../assets/svgs/eye.svg";

const SensationItemComponent = ({ model: { Sensations }, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  const showToast = useToast();

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
          <Text style={styles.defaultText}>జ్ఞ‌ా</Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.refetchButton}
            onPress={() => Sensations.asyncNext()}
          >
            <EyeIcon
              style={styles.refetchIcon}
              fill={styles.refetchIcon.color}
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
          <SensationMessage/>
        </GestureRecognizer>
        <View style={styles.controlsContainer}>
          <SensationControls/>
        </View>
      </View>
    )
  }

  if (Sensations.loading) {
    return renderLoading();
  } else {
    if (Sensations.error || Sensations.length === 0) {
      showToast("😴  Deja dormir en paz al Oráculo");
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
  defaultText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 23,
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light
  },
  // Controls
  controlsContainer: {
    flex: 1,
    backgroundColor: theme.colorPalette.darker,
    justifyContent: "center",
  },
  refetchButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
  },
  refetchIcon: {
    color: theme.colorPalette.light,
    height: 32,
    width: 32,
  },
}));

const SensationItem = gestureHandlerRootHOC(withTheming(withModel(observer(SensationItemComponent))));

export { SensationItem };
