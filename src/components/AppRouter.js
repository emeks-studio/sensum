import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./HomeScreen";
import { NewSensationScreen } from "./NewSensationScreen";
import { SensationsScreen } from "./SensationsScreen";

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
    </Stack.Navigator>
  );
}

export { AppRouter };
