import React from "react";
import { observer } from 'mobx-react';
import { View } from "react-native";
import { Form, Field } from "react-final-form";
import { Container, Content, Input, Button, Text } from "native-base";

import { ThemeSheet } from "../../assets/styles/ThemeSheet";
import { withTheming } from "../util/theming";

const messagePlaceholder =
  "¡Eres el elegido! Utiliza este cuadro de texto para transmitir tu sensación y así comience su viaje a través de la corriente.";
const authorPlaceholder = "~ Anonymous";

const NewSensationFormComponent = ({ onNewSensation, theming }) => {
  const styles = stylesByTheme[theming.theme.id];

   const renderTextAreaInput = ({ input, placeholder }) => {
     return (
       <Input
         multiline
         textBreakStrategy="balanced"
         allowFontScaling
         includeFontPadding={false}
         maxFontSizeMultiplier={2}
         adjustsFontSizeToFit
         style={styles.message}
         selectionColor={theming.theme.colorPalette.light}
         placeholder={placeholder}
         placeholderTextColor={theming.theme.colorPalette.principal}
         maxLength={250}
         {...input}
       />
     );
   };

  const renderTextInput = ({ input, placeholder }) => {
    return (
      <Input
        multiline
        adjustsFontSizeToFit
        numberOfLines={2}
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
        <Container style={styles.container}>
          <Content bordered style={styles.sensationContent}>
            <View style={styles.sensationView}>
              <Field
                component={renderTextAreaInput}
                name="message"
                placeholder={messagePlaceholder}
              />
            </View>
          </Content>
          <Container style={styles.authorContainer}>
            <Field
              component={renderTextInput}
              name="author"
              placeholder={authorPlaceholder}
            />
          </Container>
          <Container style={styles.footerContainer}>
            <Container style={styles.sendContainer}>
              <Button
                full
                onPress={handleSubmit}
                disabled={submitting}
                style={styles.button(submitting)}
              >
                <Text style={styles.buttonText(submitting)}>
                  {" "}
                  {submitting ? "Transmitiendo" : "Transmitir"}{" "}
                </Text>
              </Button>
            </Container>
          </Container>
        </Container>
      )}
    />
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  rootContainer: {
    flex: 1
  },
  container: {
    backgroundColor: theme.colorPalette.dark
  },
  sensationContent: {
    marginTop: "15%",
    flexGrow: 3,
    flexDirection: "column",
    backgroundColor: theme.colorPalette.dark,
    borderTopColor: theme.colorPalette.info,
    borderTopWidth: 1,
    borderBottomColor: theme.colorPalette.info,
    borderBottomWidth: 1
  },
  sensationView: {
    margin: "5%"
  },
  message: {
    // FIXME: Use same margin as in Sensation item!
    marginTop: "5%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 23,
    fontFamily: theme.typography.fontFamilyLight,
    color: theme.colorPalette.light,
    flexGrow: 1
  },
  authorContainer: {
    flexGrow: 1,
    margin: "5%",
    backgroundColor: theme.colorPalette.dark
  },
  author: {
    fontFamily: theme.typography.fontFamilyLight,
    fontSize: 18,
    color: theme.colorPalette.light,
    flexGrow: 1,
    textAlign: "right"
  },
  footerContainer: {
    flexGrow: 1,
    alignSelf: "flex-start",
    backgroundColor: theme.colorPalette.dark,
    flexWrap: "nowrap",
    flexDirection: "row"
  },
  sendContainer: {
    backgroundColor: theme.colorPalette.dark,
    flexGrow: 1
  },
  buttonText(submitting) {
    return {
      fontFamily: theme.typography.fontFamilyLight,
      fontSize: 18,
      color: submitting ? theme.colorPalette.dark : theme.colorPalette.light
    };
  },
  button(submitting) {
    return {
      backgroundColor: submitting
        ? theme.colorPalette.light
        : theme.colorPalette.principal
    };
  }
}));

const NewSensationForm = withTheming(observer(NewSensationFormComponent));

export { NewSensationForm };
