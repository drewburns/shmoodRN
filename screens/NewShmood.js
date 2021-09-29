import React, { useEffect, useContext, useState, Component } from "react";
import axios from "axios";
import { Loading } from "../components/common";
import {
  Keyboard,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { GlobalContext } from "../GlobalContext";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { showMessage, hideMessage } from "react-native-flash-message";

const { BASE_URL } = require("../constants");

const NewShmood = (props) => {
  const { state, setState } = useContext(GlobalContext);
  const [error, setError] = useState("");
  const [emoji, setEmoji] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [caption, setCaption] = useState("");

  const getCharactersLeft = () => {
    const maxLength = isPrivate ? 500 : 50;
    return maxLength - caption.length;
  };

  const submitShmood = () => {
    const headers = { Authorization: "bearer " + state.jwt };
    axios
      .post(
        `${BASE_URL}/api/new_post`,
        { caption, emoji, private: isPrivate },
        { headers: headers }
      )
      .then((response) => {
        setLoading(false);
        setCaption("");
        setEmoji("");
        showMessage({
          message: "Success!",
          description: `Your shmood has been updated. Plus refresh your feed to see the new shmood.`,
          type: "success",
        });
      })
      .catch((error) => {
        console.log("error posting: ", error);
        setLoading(false);
        showMessage({
          message: "Error",
          description: "Error posting shmood",
          type: "danger",
        });
      });
  };
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{ height: 800 }}
    >
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {!emoji && (
            <Text style={{ marginTop: 15 }}>
              Pick an emoji that describes your shmood.
            </Text>
          )}
          <TouchableOpacity onPress={() => setEmoji("")}>
            <View style={styles.display}>
              <Text style={{ fontSize: 64, backgroundColor: "transparent" }}>
                {emoji}
              </Text>
            </View>
          </TouchableOpacity>
          {!emoji ? (
            <EmojiSelector
              onEmojiSelected={(emoji) => setEmoji(emoji)}
              showSearchBar={true}
              showTabs={true}
              showHistory={true}
              showSectionTitles={true}
              category={Categories.all}
            />
          ) : (
            <View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                  This Shmood is for ...
                </Text>
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <Text
                    style={{
                      marginRight: 5,
                      marginTop: 3,
                      fontSize: 18,
                      textDecorationLine: isPrivate ? "none" : "underline",
                    }}
                  >
                    For friends
                  </Text>
                  <Switch
                    trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                    thumbColor={isPrivate ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#81b0ff"
                    onValueChange={() => setIsPrivate(!isPrivate)}
                    value={isPrivate}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      marginTop: 3,
                      fontSize: 18,
                      textDecorationLine: isPrivate ? "underline" : "none",
                    }}
                  >
                    Just for me
                  </Text>
                </View>
              </View>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={
                    isPrivate ? styles.textAreaPrivate : styles.textAreaFriends
                  }
                  onChangeText={(text) => setCaption(text)}
                  value={caption}
                  underlineColorAndroid="transparent"
                  placeholder="Whats on your mind?"
                  placeholderTextColor="grey"
                  numberOfLines={isPrivate ? 10 : 2}
                  //   multiline={isPrivate}
                  multiline
                />
                <Text
                  style={{ color: getCharactersLeft() >= 0 ? "#666" : "red" }}
                >
                  Characters Left: {getCharactersLeft()}{" "}
                </Text>
              </View>
              {!loading ? (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  {getCharactersLeft() >= 0 && (
                    <AwesomeButtonRick
                      width={160}
                      raiseLevel={2}
                      onPress={submitShmood}
                    >
                      Post Shmood
                    </AwesomeButtonRick>
                  )}
                </View>
              ) : (
                <Text
                  style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}
                >
                  Loading....
                </Text>
              )}
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: 800,
    // justifyContent: "center",
  },
  display: {
    width: 96,
    height: 96,
    margin: 24,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  textAreaContainer: {
    width: 300,
    flexDirection: "column",
    marginTop: 15,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 5,
  },
  textAreaPrivate: {
    height: 200,
    justifyContent: "center",
  },
  textAreaFriends: {
    height: 60,
    justifyContent: "center",
  },
});

export default NewShmood;
