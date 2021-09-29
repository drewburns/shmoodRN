import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../GlobalContext";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
const { BASE_URL } = require("../constants");

export default function FriendItem(props) {
  const { state, setState } = useContext(GlobalContext);

  console.log(props.friendship);
  const userToShow = () => {
    if (props.friendship.Friend.id != state.currentUserID) {
      return props.friendship.Friend;
    } else {
      return props.friendship.User;
    }
  };
  const acceptFriend = () => {
    const headers = { Authorization: "bearer " + state.jwt };
    axios
      .post(`${BASE_URL}/api/friends/accept/${userToShow().id}`, {}, { headers: headers })
      .then((response) => {
        showMessage({
          message: "Success!",
          description: `Friend accepted`,
          type: "success",
        });
      })
      .catch((error) => {
        console.log("error posting: ", error);
        showMessage({
          message: "Error",
          description: "Error accepting friend. They might already be a friend.",
          type: "danger",
        });
      });
  };
  const canAccept = () => {
    return props.friendship.User.id != state.currentUserID && props.friendship.status === "pending";
  };
  return (
    <View style={{ flex: 1, height: 60 }}>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.emoji}>{userToShow().current_shmood}</Text>
          <Text style={styles.username}>{userToShow().username} | </Text>
          {canAccept() ? (
            <AwesomeButtonRick
              raiseLevel={2}
              height={40}
              onPress={acceptFriend}
            >
              Accept
            </AwesomeButtonRick>
          ) : (
            <Text style={{fontSize: 20, marginTop: 7}}>{props.friendship.status === "pending" ? "Invite sent" : "Friends"}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 3,
    // textAlign: "center",
  },
  emoji: {
    fontSize: 30,
    marginTop: 3,
  },
});
