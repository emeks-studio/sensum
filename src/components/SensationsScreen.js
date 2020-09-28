import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { View, Linking, StyleSheet } from "react-native";
import { Header, Left, Right, Button, Icon } from "native-base";
import { ColorPalette } from "../../assets/styles/SensumTheme";
import { withModel } from "../model-components";
import { SensationItem } from "./SensationItem";
import { TopBarTitle } from "./ui";

const SensationsScreenComponent = ({ model: { Sensations }, navigation }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.dark
  },
  header: {
    backgroundColor: ColorPalette.dark,
    elevation: 0
  }
});

const SensationsScreen = withModel(observer(SensationsScreenComponent));

SensationsScreen.navigationOptions = {
  header: null
};

export { SensationsScreen };
