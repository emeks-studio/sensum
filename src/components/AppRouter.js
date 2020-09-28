import { connect } from "react-redux";
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
  createReduxContainer
} from "react-navigation-redux-helpers";
import { createStackNavigator } from "react-navigation";
import { HomeScreen } from "./HomeScreen";
import { NewSensationScreen } from "./NewSensationScreen";
import { SensationsScreen } from "./SensationsScreen";

const MainRouter = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    NewSensation: {
      screen: NewSensationScreen
    },
    Sensations: {
      screen: SensationsScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

const RouterReducer = createNavigationReducer(MainRouter);
const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const mapStateToProps = state => ({
  state: state.nav
});

const AppRouter = connect(mapStateToProps)(createReduxContainer(MainRouter));

export { RouterReducer, middleware, AppRouter };
