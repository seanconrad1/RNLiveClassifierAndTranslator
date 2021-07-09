import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TranslationPage from "./src/Screens/TranslationPage";
import CameraView from "./src/Screens/CameraView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="TranslationPage"
          component={TranslationPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CameraView"
          component={CameraView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
