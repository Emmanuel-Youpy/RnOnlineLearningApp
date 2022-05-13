import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainLayout } from "./screens";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import themeReducer from "./stores/themeReducer";

const Stack = createNativeStackNavigator();

const store = createStore(themeReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
