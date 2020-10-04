import React from "react";
import { View } from "react-native";
import { Header, Left, Right, Button, Icon } from "native-base";
import { showToast, TopBarTitle } from "./ui";
import { NewSensationForm } from "./NewSensationForm";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { observer } from "mobx-react";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";

const NewSensationScreenComponent = ({ model: { Oracle }, navigation, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  
  const onNewSensation = ({ author, message }) => {
    Oracle.newSensation({ author, message })
      .then(() => {
        console.debug("[NewSensationScreen.newSensation] Successfully sent");
        navigation.popToTop();
        showToast({
          text: "Tu sensación se está transmitiendo a través de la corriente"
        });
      })
      .catch(error => {
        console.debug("[NewSensationScreen.newSensation] Error", error);
        showToast({
          text: "Tu mensaje aún no es digno de ser enviado, modifícalo"
        });
      });
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        androidStatusBarColor={styles.header.backgroundColor}
      >
        <Left />
        <TopBarTitle />
        <Right>
          <Button transparent onPress={goBack}>
            <Icon type="FontAwesome" name="times" />
          </Button>
        </Right>
      </Header>
      <NewSensationForm onNewSensation={onNewSensation} />
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

const NewSensationScreen = withTheming(withModel(observer(NewSensationScreenComponent)));

NewSensationScreen.navigationOptions = {
  header: null
};

export { NewSensationScreen };
