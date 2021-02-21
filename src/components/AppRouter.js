import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { NewSensationScreen } from "./NewSensationScreen";
import { SensationsScreen } from "./SensationsScreen";
import { app as MiscellaneousScreen } from "./MiscellaneousScreen.bs";

const Stack = createStackNavigator();

function AppRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="NewSensation"
        options={{
          headerShown: false,
        }}
        component={NewSensationScreen}
      />
      <Stack.Screen
        name="Sensations"
        options={{
          headerShown: false,
        }}
        component={SensationsScreen}
      />
      <Stack.Screen
        name="Miscellaneous"
        options={{
          headerShown: false,
        }}
        component={MiscellaneousScreen}
      />
    </Stack.Navigator>
  );
}

export { AppRouter };
