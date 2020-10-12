import React from "react";
import { observer } from "mobx-react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Form, Field } from "react-final-form";
import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { withTheming } from "../util/theming";
import SensumLogo from "../components/ui/svgs/Logo";

const messagePlaceholder =
  "¡Eres el elegido! Utiliza este cuadro de texto para transmitir tu sensación y así comience su viaje a través de la corriente.";
const authorPlaceholder = "~ Anonymous";

const NewSensationFormComponent = ({ onNewSensation, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  const renderSensation = ({ input, placeholder }) => {
    return (
      <TextInput
        multiline
        allowFontScaling
        textBreakStrategy="balanced"
        maxLength={250}
        selectionColor={theming.theme.colorPalette.light}
        maxFontSizeMultiplier={2}
        placeholder={placeholder}
        placeholderTextColor={theming.theme.colorPalette.principal}
        style={styles.sensation}
        {...input}
      />
    );
  };
  const renderAuthor = ({ input, placeholder }) => {
    return (
      <TextInput
        style={styles.author}
        selectionColor={theming.theme.colorPalette.light}
        placeholder={placeholder}
        placeholderTextColor={theming.theme.colorPalette.principal}
        maxLength={50}
        {...input}
      />
    );
  };
  return (
    <Form
      onSubmit={onNewSensation}
      render={({ handleSubmit, submitting }) => (
        <View style={styles.rootContainer}>
          <View style={styles.messageContainer}>
            <View style={styles.sensationContainer}>
              <SensumLogo
                slice={true}
                circleOpacity={0}
                style={styles.logoBackground}
              />
              <Field
                component={renderSensation}
                name="message"
                placeholder={messagePlaceholder}
              />
            </View>
            <View style={styles.authorContainer}>
              <Field
                component={renderAuthor}
                name="author"
                placeholder={authorPlaceholder}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={submitting}
            style={[
              styles.buttonStyle,
              styles.buttonConditionalStyle(submitting),
            ]}
          >
            <Text style={styles.buttonText(submitting)}>
              {submitting ? "Transmitiendo" : "Transmitir"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
const stylesByTheme = ThemeSheet.create((theme) => ({
  rootContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  messageContainer: {
    justifyContent: "center",
    flexGrow: 1
  },
  sensationContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorPalette.darker,
    borderBottomWidth: 1,
    borderBottomColor: theme.colorPalette.dark
  },
  logoBackground: {
    position: 'absolute',
    width: '120%',
    height: 200,
    color: theme.colorPalette.dark
  },
  sensation: {
    flexGrow: 1,
    padding: 10,
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    fontSize: 23,
    textAlign: "center",
  },
  authorContainer: {
    flex: 1
  },
  author: {
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    backgroundColor: theme.colorPalette.darker,
    fontSize: 18,
    paddingRight: 20,
    textAlign: "right",
  },
  buttonStyle: {
    padding: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.5,
    elevation: 5,
  },
  buttonConditionalStyle(submitting) {
    return {
      backgroundColor: submitting
        ? theme.colorPalette.light
        : theme.colorPalette.principal,
    };
  },
  buttonText(submitting) {
    return {
      fontFamily: theme.typography.fontFamilyLight,
      fontSize: 18,
      textAlign: "center",
      color: submitting ? theme.colorPalette.dark : theme.colorPalette.light,
    };
  },
}));

const NewSensationForm = withTheming(observer(NewSensationFormComponent));

export { NewSensationForm };
