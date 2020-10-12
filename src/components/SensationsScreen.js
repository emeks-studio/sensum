import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { View, Linking } from "react-native";
import { Header, Left, Right, Button, Icon } from "native-base";
import { ThemeSheet } from "../assets/styles/ThemeSheet";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";

import { SensationItem } from "./SensationItem";
import { TopBarTitle } from "./ui";

const SensationsScreenComponent = ({ model: { Sensations }, navigation, theming }) => {
  const styles = stylesByTheme[theming.theme.id];

  useEffect(() => {
    console.debug("[SensationsScreen::refresh]");
    Sensations.reset();
    Sensations.getMoreSensations();
  }, []);

  const goToHome = () => {
    navigation.navigate("Home");
  };

  const goToLore = () => {
    const url = "https://emeks.gitlab.io/sensum/lore/";
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        androidStatusBarColor={styles.header.backgroundColor}
      >
        <Left />
        <TopBarTitle onPress={goToLore} />
        <Right>
          <Button transparent onPress={goToHome}>
            <Icon type="FontAwesome" name="times" />
          </Button>
        </Right>
      </Header>
      <SensationItem />
    </View>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colorPalette.dark
  },
  header: {
    backgroundColor: theme.colorPalette.dark,
    elevation: 0
  }
}));

const SensationsScreen = withTheming(withModel(observer(SensationsScreenComponent)));

SensationsScreen.navigationOptions = {
  header: null
};

export { SensationsScreen };
