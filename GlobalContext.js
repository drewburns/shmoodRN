import React, { useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';
import deviceStorage from "./services/deviceStorage.js";
import jwtDecode from "jwt-decode";

const GlobalContext = React
  .createContext
  //   (null as unknown) as ContextProps
  ();

const initialState = { jwt: "", loading: false, user: null, currentUserID: null };

const GlobalContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem("id_token");
      const value = await AsyncStorage.getItem("id_token");
      const decodedToken = jwtDecode(value, { header: false });
      const currentUserID = decodedToken.sub;
      // console.log(value)
      if (value !== null) {
        setState({
          jwt: value,
          user: null,
          loading: false,
          currentUserID: currentUserID
        });
      } else {
        setState({
          loading: false,
        });
      }
      // If you want to also store it in async storage,
      // you could always access it here and set the jwt in state
    })();
  },[]);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };