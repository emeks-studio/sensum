import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react";
import _ from 'lodash';
import { AppState, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { AppRouter } from './AppRouter';
import ReduxStore from '../state/ReduxStore';
import { configCarrierCrow } from '../model/CarrierCrow';
import { useModel } from '../model-components';
import { showToast } from './ui';
import { handleBackButton } from '../util/navigator';
import { useTheming } from '../util/theming';

function AppComponent() {
  const [state, setState ] = useState({
    appState: AppState.currentState,
  });
  const { theming } = useTheming();
  const { Oracle } = useModel();
  const CarrierCrow = configCarrierCrow({ Oracle });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }    
  })
  
  useEffect(()=> {
    Oracle.praiseTheSun().then(result => {
      theming.setThemeBy(result.mood);
      showToast({ text: result.line});
    });
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    }
  })

  useEffect(()=> {
    if (state.appState !== 'background') {
      console.debug('[App::useEffect] First time (not from background)');
      CarrierCrow.suscribe();
      return () => {
        CarrierCrow.unsuscribe();
      }
    }
  }, [state.appState]);

  const handleAppStateChange = (nextAppState) => {
    if (state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.debug('[App::handleAppStateChange] FROM foreground');
    }
    setState({appState: nextAppState});
  }

  return (
    <Provider store={ReduxStore}>
      <Root>
        <AppRouter />
      </Root>  
    </Provider>   
  );
}

const App = observer(AppComponent);

export {
  App
}