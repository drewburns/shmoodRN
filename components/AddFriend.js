import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { GlobalContext } from "../GlobalContext";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
const { BASE_URL } = require("../constants");

export default function AddFriend() {
  const { state, setState } = useContext(GlobalContext);
  const [username, setUsername] = useState("");

  const addFriend = () => {
    const headers = { Authorization: "bearer " + state.jwt };
    axios
      .post(`${BASE_URL}/api/friends/add/${username}`, {}, { headers: headers })
      .then((response) => {
        showMessage({
          message: "Success!",
          description: `Friend invite sent`,
          type: "success",
        });
      })
      .catch((error) => {
        console.log("error posting: ", error);
        showMessage({
          message: "Error",
          description: "Error adding friend",
          type: "danger",
        });
      });
  };
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: 400 }}
    >
      <Text style={{ fontSize: 20 }}>Add Friend</Text>
      <TextInput
        placeholder="randy"
        label="Username"
        autoCapitalize="none"
        autoCorrect="false"
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholderColor="#666"
        style={styles.loginFormTextInput}
      />
      <AwesomeButtonRick width={160} raiseLevel={2} onPress={addFriend}>
        Add Friend
      </AwesomeButtonRick>
    </View>
  );
}

const styles = StyleSheet.create({
  loginFormTextInput: {
    height: 43,
    width: 200,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 15,
  },
});
