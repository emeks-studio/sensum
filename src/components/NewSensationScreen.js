import React from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { showToast } from "./ui";
import { NewSensationForm } from "./NewSensationForm";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { observer } from "mobx-react";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import Close from "../components/ui/svgs/closeAlt.svg";

const NewSensationScreenComponent = ({ model: { Oracle }, navigation, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  
  const onNewSensation = ({ author, message }) => {
    Oracle.newSensation({ author, message })
      .then(() => {
        console.debug("[NewSensationScreen.newSensation] Successfully sent");
        navigation.popToTop();
        showToast({
          text: "Tu sensación se está transmitiendo a través de la corriente"
        }, theming);
      })
      .catch(error => {
        console.debug("[NewSensationScreen.newSensation] Error", error);
        showToast({
          text: "Tu mensaje aún no es digno de ser enviado, modifícalo"
        }, theming);
      });
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <StatusBar color={styles.header.backgroundColor}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Close style={styles.closeButton}/>
        </TouchableOpacity>
      </View>
      <NewSensationForm onNewSensation={onNewSensation} />
    </View>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colorPalette.dark,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginBottom: 20
  },
  closeButton: {
    height: 32,
    width: 32
  }
}));

const NewSensationScreen = withTheming(withModel(observer(NewSensationScreenComponent)));

NewSensationScreen.navigationOptions = {
  header: null
};

export { NewSensationScreen };
