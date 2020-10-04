
import React from "react";
import { observable, action } from "mobx";

import {
  happyTheme,
  neutralTheme,
  angryTheme
} from "../../assets/styles/Themes";

// Hardcoded in the backend!
const HAPPY_MOOD = "⌒_⌒";
const ANGRY_MOOD = "ಠ_ಠ";
const NEUTRAL_MOOD = "⚆_⚆";

class Theming {
  @observable theme = happyTheme;
  
  @action
  setThemeBy(mood) {
    this.theme = this.themeByMood(mood);
  }
  
  themeByMood = (mood) => {
    switch (mood) {
      case HAPPY_MOOD:
        return happyTheme;
      case ANGRY_MOOD:
        return angryTheme;
      case NEUTRAL_MOOD:
        return neutralTheme;
      default:
        return happyTheme;
    }
  }
}

const ThemingContext = React.createContext({
  theming: new Theming()
});

const useTheming = () => React.useContext(ThemingContext);

const withTheming = ComponentToWrap => props => {
  const { theming } = useTheming();
  return <ComponentToWrap theming={theming} {...props} />;
};

export {
  useTheming,
  withTheming
};
