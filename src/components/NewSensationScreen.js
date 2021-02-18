import React from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { useToast } from "./ui";
import { NewSensationForm } from "./NewSensationForm";
import { ThemeSheet } from "../assets/styles/ThemeSheet";
import { observer } from "mobx-react";
import { withModel } from "../model-components";
import { withTheming } from "../util/theming";
import Close from "../assets/svgs/close.svg";

const NewSensationScreenComponent = ({ model: { Oracle }, navigation, theming }) => {
  const showToast = useToast();
  const styles = stylesByTheme[theming.theme.id];
  
  const onNewSensation = ({ author, message }) => {
    Oracle.newSensation({ author, message })
      .then(() => {
        console.debug("[NewSensationScreen.newSensation] Successfully sent");
        navigation.popToTop();
        showToast("Tu sensación se está transmitiendo a través de la corriente");
      })
      .catch(error => {
        console.debug("[NewSensationScreen.newSensation] Error", error);
        showToast("Tu mensaje aún no es digno de ser enviado, modifícalo");
      });
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <StatusBar color={styles.container.backgroundColor}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Close style={styles.closeButton} fill={styles.closeButton.color} />
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
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 15
  },
  closeButton: {
    color: theme.colorPalette.light,
    height: 32,
    width: 32
  }
}));

const NewSensationScreen = withTheming(withModel(observer(NewSensationScreenComponent)));

NewSensationScreen.navigationOptions = {
  header: null
};

export { NewSensationScreen };
