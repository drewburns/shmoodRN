import React, { Component, useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, View, Text } from "react-native";
import User from "./User";
import FriendList from "../components/FriendList";
import AddFriend from "../components/AddFriend";
import { GlobalContext } from "../GlobalContext";
import jwtDecode from "jwt-decode";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();

const LoadingScreen = () => {
  const { state } = useContext(GlobalContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading</Text>
    </View>
  );
};

const UserStack = (props) => {
  // console.log(props);
  //   const { state } = useContext(GlobalContext);
  //   const [userId, setUserId] = useState(null);
  //   useEffect(() => {
  //     var decodedToken = jwtDecode(state.jwt, { header: false });
  //     if (decodedToken.sub) {
  //       setUserId(decodedToken.sub);
  //     }
  //   }, []);

  // const rightButtonAction = () => {
  //   if (isUserCurrentUser()) {
  //     props.navigation.navigate("UpdateUser");
  //   } else {
  //     props.navigation.push("FriendsList");
  //   }
  // };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Me"
        component={User}
        options={{
          headerTitle: "Me",
        }}
      />
      <HomeStack.Screen name="FriendList" component={FriendList} />
      <HomeStack.Screen name="AddFriend" component={AddFriend} />
      {/* <HomeStack.Screen name="UpdateUser" component={UpdateUser} /> */}
      {/* <HomeStack.Screen
        name="FriendsList"
        component={FriendsList}
        // gotta change userId later
        initialParams={{
          userId: userId,
          currentUserID: userId,
          jwt: state.jwt,
        }}
      /> */}
    </HomeStack.Navigator>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default UserStack;
