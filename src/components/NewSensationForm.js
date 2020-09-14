import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Form, Field } from 'react-final-form';
import {
  Container,
  Content,
  Input,
  Button,
  Text
} from 'native-base';

import {
  ColorPalette,
  Typography
} from '../../assets/styles/SensumTheme';

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
      selectionColor={ColorPalette.light}
      placeholder={placeholder}
      placeholderTextColor={ColorPalette.principal}
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
        selectionColor={ColorPalette.light}
        placeholder={placeholder}
        placeholderTextColor={ColorPalette.principal}
        maxLength={50}
        {...input}
      />
  );
};

const messagePlaceholder = "¡Eres el elegido! Utiliza este cuadro de texto para transmitir tu sensación y así comience su viaje a través de la corriente.";
const authorPlaceholder = "~ Anonymous";

const NewSensationForm = ({onNewSensation}) => (
  <Form
    onSubmit={onNewSensation}
    render={({ handleSubmit, submitting }) => (
      <Container style={styles.container} >
        <Content bordered style={styles.sensationContent}>
          <View style={styles.sensationView}>
            <Field component={renderTextAreaInput} name="message" placeholder={messagePlaceholder} />
          </View>
        </Content>
        <Container style={styles.authorContainer}>
          <Field component={renderTextInput} name="author" placeholder={authorPlaceholder}/>
        </Container>
        <Container style={styles.footerContainer}>
          <Container style={styles.sendContainer}>
            <Button full onPress={handleSubmit} disabled={submitting} style={styles.button(submitting)}>
              <Text style={styles.buttonText(submitting)}> {submitting ? "Transmitiendo" : "Transmitir" } </Text>
            </Button>      
          </Container>
        </Container>
      </Container>           
    )}
  />
);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1  
  },
  container: {
    backgroundColor: ColorPalette.dark,
  },
  sensationContent: {
    marginTop: "15%",
    flexGrow: 3,
    flexDirection: "column",
    backgroundColor: ColorPalette.dark,
    borderTopColor: ColorPalette.info,
    borderTopWidth: 1,
    borderBottomColor: ColorPalette.info,
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
    fontFamily: Typography.fontFamilyLight,
    color: ColorPalette.light,
    flexGrow: 1,
  },
  authorContainer: {
    flexGrow: 1,
    margin: "5%",
    backgroundColor: ColorPalette.dark,
  },
  author: {
    fontFamily: Typography.fontFamilyLight,
    fontSize: 18,
    color: ColorPalette.light,
    flexGrow: 1,
    textAlign: 'right',
  },
  footerContainer: {
    flexGrow: 1,
    alignSelf: "flex-start",
    backgroundColor: ColorPalette.dark,
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  'sendContainer': {
    backgroundColor: ColorPalette.dark,
    flexGrow: 1
  },
  buttonText(submitting) {
    return {
      fontFamily: Typography.fontFamilyLight,
      fontSize: 18,
      color: submitting ? ColorPalette.dark : ColorPalette.light
    }
  },
  button(submitting) {
    return {
      backgroundColor: submitting ? ColorPalette.light : ColorPalette.principal,
    }
  }
});

export default NewSensationForm;
