import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainLayout } from "./screens";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Dashboard"}
      >
        <Stack.Screen name="Dashboard" component={MainLayout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
