import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import BottomTabs from "./navigation/TabBar";
import Auth from "./navigation/Auth";

const AppNavigator = ({}) => {
  const global = useContext(GlobalContext);
  const {
    state: { jwt },
  } = global;
  return jwt ? <BottomTabs /> : <Auth />;
};

export default AppNavigator;