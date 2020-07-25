import React from "react";
import { GlobalContextProvider } from "./GlobalContext";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";

const Root = () => (
  <NavigationContainer>
    <GlobalContextProvider>
      <AppNavigator />
      <FlashMessage position="top" />
    </GlobalContextProvider>
  </NavigationContainer>
)

export default Root;
