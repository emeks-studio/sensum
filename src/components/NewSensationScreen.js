import React from "react";
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from "react-native";
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
        <TouchableOpacity style={styles.buttonView} onPress={goBack}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    justifyContent: "flex-end",
    elevation: 0
  },
  buttonView: {
    width: 32
  },
  closeButton: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  }
}));

const NewSensationScreen = withTheming(withModel(observer(NewSensationScreenComponent)));

NewSensationScreen.navigationOptions = {
  header: null
};

export { NewSensationScreen };
