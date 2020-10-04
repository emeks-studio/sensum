import React from "react";
import { observer } from 'mobx-react';
import { Body, Button, Title } from "native-base";
import { ThemeSheet } from "../../../assets/styles/ThemeSheet";
import { withTheming } from "../../util/theming";

const TopBarTitleComponent = ({ onPress, theming }) => {
  const styles = stylesByTheme[theming.theme.id];
  return (
    <Body>
      <Button
        style={styles.headerButton}
        transparent
        onPress={() => onPress && onPress()}
      >
        <Title style={styles.headerText}> sensum </Title>
      </Button>
    </Body>
  );
};

const stylesByTheme = ThemeSheet.create(theme => ({
  headerButton: {
    alignSelf: "flex-end"
  },
  headerText: {
    color: theme.colorPalette.light,
    fontFamily: theme.typography.fontFamilyLight
  }
}));

const TopBarTitle = withTheming(observer(TopBarTitleComponent));

export {
  TopBarTitle
};
