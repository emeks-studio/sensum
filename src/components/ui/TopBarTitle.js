import React from "react";
import { Body, Button, Title } from "native-base";
import { ThemeSheet } from "../../../assets/styles/ThemeSheet";

export const TopBarTitle = ({ onPress }) => {
  const { theme } = useTheme();
  const styles = stylesByTheme[theme.id];
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
