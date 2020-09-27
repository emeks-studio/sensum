import { combineReducers, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { RouterReducer, middleware } from '../components/AppRouter';

const ReduxStore = createStore(
  combineReducers({
    nav: RouterReducer
  }),
  applyMiddleware(middleware)
  // applyMiddleware(logger) // (!) In PRODUCTION remove it
);

export default ReduxStore;
