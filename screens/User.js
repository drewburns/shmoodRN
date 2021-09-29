import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, Modal, Button } from "react-native";
import axios from "axios";
import { GlobalContext } from "../GlobalContext";
import { showMessage, hideMessage } from "react-native-flash-message";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { TouchableOpacity } from "react-native-gesture-handler";
import SearchUsers from "../components/SearchUsers";
import FriendList from "../components/FriendList";
import PendingFriends from "../components/PendingFriends";
const { BASE_URL } = require("../constants");
export default function User(props) {
  const { state, setState } = useContext(GlobalContext);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const headers = { Authorization: "bearer " + state.jwt };
    axios
      .get(`${BASE_URL}/api/get_current_user`, {
        headers: headers,
      })
      .then((response) => {
        if (!response.data) {
          return;
        }

        if (response.data) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        showMessage({
          message: "Error",
          description: "Error getting user",
          type: "danger",
        });
      });
  };

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, []);
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: 400 }}
    >
      {user ? (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            {user.username}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            My Current Shmood:
          </Text>
          <Text style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>
            {user.current_shmood}
          </Text>
          <AwesomeButtonRick
            onPress={() => {
              props.navigation.push("FriendList", { type: "friends" });
            }}
          >
            My Friends
          </AwesomeButtonRick>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <AwesomeButtonRick
              onPress={() => {
                props.navigation.push("AddFriend", { type: "add" });
              }}
            >
              Add Friend
            </AwesomeButtonRick>
            <AwesomeButtonRick
              onPress={() => {
                props.navigation.push("FriendList", { type: "pending" });
              }}
            >
              Pending Friends
            </AwesomeButtonRick>
          </View>
          <Text style={{ marginTop: 30, fontSize: 20 }}>
            🚧 Page under construction 🚧
          </Text>
        </View>
      ) : (
        <View>
          <Text>Could not load</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
