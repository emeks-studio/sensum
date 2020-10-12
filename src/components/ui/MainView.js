
import React from "react";

const MainView = (props) => (
    <View style={styles.rootContainer}>
      <View
        style={styles.header}
        androidStatusBarColor={styles.header.backgroundColor}
      >
        <TopBarTitle onPress={showNetwork} />
          <Button transparent onPress={goToPulse}>
            <AnimatedFadeingIcon name="pulse" />
          </Button>
      </View>
    </View>
)

const stylesByTheme = ThemeSheet.create(theme => ({
  rootContainer: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: theme.colorPalette.dark
  }
}));