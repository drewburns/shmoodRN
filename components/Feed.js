import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  Switch,
  processColor,
  ShadowPropTypesIOS,
} from "react-native";
import axios from "axios";
import { GlobalContext } from "../GlobalContext";
import { showMessage, hideMessage } from "react-native-flash-message";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
const { BASE_URL } = require("../constants");

const Feed = (props) => {
  const { state, setState } = useContext(GlobalContext);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState({});
  const [showPrivate, setShowPrivate] = useState(false);

  const isCurrentUser = () => {
    return state.user && user.id === state.user.id;
  };
  useEffect(() => {
    (async () => {
      await getItems();
    })();
  }, []);

  useEffect(() => {
    if (refreshing) {
      getItems();
    }
  }, [refreshing]);
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

  const onEndReached = () => {
    if (!onEndReachedCalledDuringMomentum) {
      getItems();
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  const onRefresh = () => {
    setPosts([]);
    setPage(0);
    setRefreshing(true);
  };

  const getItems = () => {
    const headers = { Authorization: "bearer " + state.jwt };
    const feedPath = props.route.params.feedPath;
    axios
      .get(`${BASE_URL}/${feedPath}?page=${page}`, { headers: headers })
      .then((response) => {
        if (!response.data) {
          setRefreshing(false);
          return;
        }

        if (response.data) {
          setPosts(posts.concat(response.data));
          setPage(page + 1);
          setRefreshing(false);
        }
      })
      .catch((error) => {
        showMessage({
          message: "Error",
          description: "Error getting shmoods",
          type: "danger",
        });
      });
  };

  const retryItems = () => {
    getItems();
    setPage(0);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <Text style={{ marginRight: 5, marginTop: 3, fontSize: 18, textDecorationLine: showPrivate ? "none" : "underline" }}>
          Friends
        </Text>
        <Switch
          trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
          thumbColor={showPrivate ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#81b0ff"
          onValueChange={() => setShowPrivate(!showPrivate)}
          value={showPrivate}
        />
        <Text style={{ marginLeft: 5, marginTop: 3, fontSize: 18, textDecorationLine: !showPrivate ? "none" : "underline" }}>
          Private
        </Text>
      </View>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={FlatListItemSeparator}
          onScroll={onScroll}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onMomentumScrollBegin={() => {
            setOnEndReachedCalledDuringMomentum(false);
          }}
          renderItem={({ item }) => (
            <View>
              <Text>Yeet</Text>
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      ) : (
        <View style={styles.emptySearch}>
          <Text style={styles.emptySearchText}>No Shmoods Found</Text>
          <AwesomeButtonRick raiseLevel={2} onPress={retryItems}>
            Click To Retry
          </AwesomeButtonRick>
        </View>
      )}
    </View>
  );
};
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
};

export default Feed;
