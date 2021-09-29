import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import TimeAgo from "react-native-timeago";

export default function Item(props) {
    // const date = new Date(props.post.created_at);
    // console.log(date.toDateString());
  const width = Dimensions.get("window").width;
  const getHeight = () => {
    if (props.post.private) {
      return 120;
    } else {
      const postLen = props.post.caption.length;
      if (postLen > 50) {
        return 400;
      }
    }
  };

  const getFontSize = () => {
    if (!props.post.private) {
      return 20;
    } else {
      const postLen = props.post.caption.length;
      if (postLen > 50) {
        return 14;
      } else {
          return 20;
      }
    }
  };
  return (
    <View
      style={{
        width: width,
        height:
          props.post.caption.length > 50
            ? props.post.caption.length > 100
              ? 300
              : 200
            : 120,
        marginBottom: 7,
        marginTop: 7,
      }}
    >
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.emoji}>{props.post.emoji}</Text>
          <Text style={styles.username}>
            : {props.post.User.username}'s {props.post.private && "(private)"}{" "}
            shmood
          </Text>
        </View>
        <Text  style={{ fontSize: getFontSize(), marginBottom: 8 }}>
          {props.post.caption}
        </Text>
        <TimeAgo time={props.post.created_at} />
      </View>
    </View>
  );
}

// var width = Dimensions.get("window").height;
const styles = StyleSheet.create({
  username: {
    fontSize: 18,
    marginTop: 13,
    marginLeft: 5,
    // textAlign: "center",
  },
  emoji: {
    fontSize: 40,
  },
});
