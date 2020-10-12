import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Container, Header, Right, Button, Left } from "native-base";
import { showToast, TopBarTitle, AnimatedFadeingIcon } from "./ui";
import { Tamagochi } from "./Tamagochi";
import SensumLogo from "../../assets/img/sensum_logo.svg";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import User from "../model/User";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";

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

  const showNetwork = () => {
    User.tryGatherAcolytes().then(n => {
      if (n) showToast({ text: `${n} electrones en órbita` }, theming);
      else showToast({ text: `sin conexión` }, theming);
    });
  };

  return (
    <Container>
      <Header
        style={styles.header}
        androidStatusBarColor={styles.header.backgroundColor}
      >
        <Left />
        <TopBarTitle onPress={showNetwork} />
        <Right>
          <Button transparent onPress={goToPulse}>
            <AnimatedFadeingIcon name="pulse" />
          </Button>
        </Right>
      </Header>
      <Container style={styles.container}>
        <Tamagochi />
        {Oracle.userIsTheChosenOne && (
          <Button
            style={styles.transmissionButton}
            rounded
            bordered
            onPress={goToTransmisionRoom}
          >
            <SensumLogo />
          </Button>
        )}
      </Container>
    </Container>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  header: {
    backgroundColor: theme.colorPalette.dark,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0
    },
    shadowRadius: 0,
    elevation: 0
  },
  headerText: {
    color: theme.colorPalette.light,
    fontFamily: theme.typography.fontFamilyLight,
    alignSelf: "flex-end"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorPalette.dark
  },
  transmissionButton: {
    position: "relative",
    height: 45,
    width: 45,
    marginTop: 20,
    backgroundColor: theme.colorPalette.dark,
    borderColor: "transparent",
    alignSelf: "center",
    left: "15%",
    shadowOpacity: 0.8,
    elevation: 3
  }
}));

const HomeScreen = withTheming(withModel(observer(HomeScreenComponent)));

HomeScreen.navigationOptions = {
  header: null
};

export { HomeScreen };
