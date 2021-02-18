import React from "react";
import { observer } from "mobx-react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Form, Field } from "react-final-form";
import { ThemeSheet } from "../assets/styles/ThemeSheet";
import { withTheming } from "../util/theming";
import SensumLogo from "../assets/svgs/Logo";

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
        style={styles.message}
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
          <View style={styles.sensationContainer}>
            <SensumLogo
              slice
              circleOpacity={0}
              style={styles.logoBackground}
            />
            <View style={styles.messageContainer}>
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
          <View style={styles.buttonContainer}>
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
        </View>
      )}
    />
  );
};
const stylesByTheme = ThemeSheet.create((theme) => ({
  rootContainer: {
    flex: 1,
    justifyContent: "space-around"
  },
  sensationContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
    backgroundColor: theme.colorPalette.darker,
  },
  messageContainer: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colorPalette.dark
  },
  logoBackground: {
    position: 'absolute',
    width: '110%',
    height: 200,
    color: theme.colorPalette.dark
  },
  message: {
    flexGrow: 1,
    padding: 10,
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    fontSize: 23,
    textAlign: "center"
  },
  authorContainer: {
    height: 64,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  author: {
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    fontSize: 18,
    textAlign: "right"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  buttonStyle: {
    padding: 15,
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
