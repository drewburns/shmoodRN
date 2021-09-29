import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { GlobalContext } from "../GlobalContext";
import { showMessage, hideMessage } from "react-native-flash-message";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { TouchableOpacity } from "react-native-gesture-handler";
import FriendItem from "./FriendItem";
const { BASE_URL } = require("../constants");
export default function FriendList(props) {
  const { state, setState } = useContext(GlobalContext);
  const [friends, setFriends] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  useEffect(() => {
    (async () => {
      await getItems();
    })();
  }, []);

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#666",
        }}
      />
    );
  };
  const getItems = () => {
    const headers = { Authorization: "bearer " + state.jwt };
    const type = props.route.params.type;
    axios
      .get(`${BASE_URL}/api/friends/${type}?page=${page}`, {
        headers: headers,
      })
      .then((response) => {
        if (!response.data) {
          setRefreshing(false);
          return;
        }

        if (response.data) {
          setFriends(friends.concat(response.data));
          setPage(page + 1);
          setRefreshing(false);
        }
      })
      .catch((error) => {
        console.log(error);
        showMessage({
          message: "Error",
          description: "Error getting friends",
          type: "danger",
        });
      });
  };

  const retryItems = () => {
    getItems();
    setPage(0);
  };

  const onEndReached = () => {
    if (!onEndReachedCalledDuringMomentum) {
      getItems();
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  const onRefresh = () => {
    setFriends([]);
    setPage(0);
    setRefreshing(true);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#d3d3d3",
          height: 2,
          width: 1000,
          marginTop: 10,
        }}
      ></View>
      {friends.length > 0 ? (
        <FlatList
          data={friends}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatListItemSeparator}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          renderItem={({ item }) => <FriendItem friendship={item} />}
          keyExtractor={(item, index) => String(index)}
        />
      ) : (
        <View style={styles.emptySearch}>
          <Text style={styles.emptySearchText}>No Friends Found</Text>
          <AwesomeButtonRick raiseLevel={2} onPress={retryItems}>
            Click To Retry
          </AwesomeButtonRick>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptySearch: {
    height: 300,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  emptySearchText: {
    fontSize: 25,
  },
  itemContainer: {
    flex: 1,
  },
};
