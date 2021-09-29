import React, { useContext } from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import { Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Home from "../screens/Home";
import UserStack from "../screens/UserStack";
import NewShmood from "../screens/NewShmood";
const Tabs = createBottomTabNavigator();

const Placeholder = () => {
  return (
    <View>
      <Text>Placeholder</Text>
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            // <TabBarIcon focused={focused} name="md-leaf" />
            <Entypo
              name="leaf"
              size={24}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="New Shmood"
        component={NewShmood}
        options={{
          title: "New Shmood",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add" />
          ),
        }}
      />
      <Tabs.Screen
        name="Me"
        component={UserStack}
        options={{
          title: "Me",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-happy" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
