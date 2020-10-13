import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { AnimatedFadingIcon } from "./ui";
import { ThemeSheet } from "../assets/styles/ThemeSheet";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import { Tamagochi } from "./Tamagochi";
import SensumLogo from "../assets/svgs/Logo";
import PulseIcon from "../assets/svgs/pulse.svg";
import TransmissionIcon from "../assets/svgs/rings.svg";

const HomeScreenComponent = ({ model: { Oracle }, navigation, theming }) => {
  const styles = stylesByTheme[theming.theme.id];

  useEffect(() => {
    Oracle.init();
  }, [Oracle]);

  const goToPulse = () => {
    navigation.push("Sensations");
  };

  const goToTransmisionRoom = () => {
    navigation.push("NewSensation");
  };


  return (
    <View style={styles.rootContainer}>
      <StatusBar color={styles.rootContainer.backgroundColor}/>
      <SensumLogo
        style={styles.logoBackground}
        slice
        opacity={0.5}
        circleOpacity={0.3}
        rotate={-45}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPulse}>
          <AnimatedFadingIcon Icon={ () => PulseIcon({
            style: styles.sensationsButton,
            fill: styles.sensationsButton.color
          })}/>
        </TouchableOpacity>
      </View>
      <View style={styles.oracleContainer}>
        <Tamagochi />
      </View>
      {Oracle.userIsTheChosenOne && (
        <TouchableOpacity style={styles.transmissionContainer} onPress={goToTransmisionRoom}>
          <TransmissionIcon
            style={styles.transmissionIcon}
            fill={styles.transmissionIcon.color}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  rootContainer: {
    flex: 1, 
    backgroundColor: theme.colorPalette.dark,
    overflow: "hidden"
  },
  logoBackground: {
    position: "absolute",
    color: theme.colorPalette.darker
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginBottom: 15,
    padding: 20
  },
  headerText: {
    color: theme.colorPalette.light,
    fontFamily: theme.typography.fontFamilyLight
  },
  oracleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  sensationsButton: {
    color: theme.colorPalette.light,
    height: 32,
    width: 32
  },
  transmissionContainer: {
    position: "absolute",
    right: 20,
    bottom: 40,
    height: 64,
    width: 64,
    borderRadius: 100,
    backgroundColor: theme.colorPalette.darker,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  transmissionIcon: {
    height: 32,
    width: 32,
    color: theme.colorPalette.light
  }
}));

const HomeScreen = withTheming(withModel(observer(HomeScreenComponent)));

HomeScreen.navigationOptions = {
  header: null
};

export { HomeScreen };
