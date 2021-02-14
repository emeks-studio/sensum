
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from "mobx-react";
import _ from 'lodash';
import { AppState, BackHandler, Platform } from 'react-native';
import BackgroundColor from 'react-native-background-color';
import { AppRouter } from './AppRouter';
import { configCarrierCrow } from '../model/CarrierCrow';
import { useModel } from '../model-components';
import { ToastProvider } from './ui/useToast';
import { useToast } from './ui';
import { handleBackButton } from '../util/navigator';
import { useTheming } from '../util/theming';

function AppComponent() {
  const [state, setState ] = useState({
    appState: AppState.currentState,
  });
  const showToast = useToast();
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
    Oracle.praiseTheSun()
    .then(result => {
      theming.setThemeBy(result.mood);
      // Fix: Splash screen showing behind app 
      if (Platform.OS === "android") {
        BackgroundColor.setColor(theming.theme.colorPalette.dark);
      };
      showToast(result.line)
    })
    .catch(_ => {
      theming.setThemeBy();
      // Fix: Splash screen showing behind app 
      if (Platform.OS === "android") {
        BackgroundColor.setColor(theming.theme.colorPalette.dark);
      };
      showToast("😴  El Oráculo duerme un sueño imposible");
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

  return <AppRouter />;
}

const AppWithProviders = () => {
  return (
    <NavigationContainer>
      <ToastProvider>
        <AppComponent/>
      </ToastProvider>
    </NavigationContainer>
  );
}

const App = observer(AppWithProviders);

export {
  App
}