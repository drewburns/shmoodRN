import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../components/Feed";

const HomeStack = createStackNavigator();
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          initialParams={{ feedPath: "home" }}
          options={{
            headerTitle: "Shmood",
          }}
          component={Feed}
        />
        <HomeStack.Screen name="DisplayUser" component={Feed} />
      </HomeStack.Navigator>
    );
  }
}
