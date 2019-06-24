import React, { Component } from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import ChatStack from "./ChatStack";

// export default createBottomTabNavigator({
//   HomeStack,
//   SearchStack,
//   ChatStack,
// });

import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import HomeScreen from "../components/Home";

export default MainTab = createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    ChatStack
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigation.state.index === 0}
              onPress={() => props.navigation.navigate("HomeStack")}
            >
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate("SearchStack")}
            >
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index === 2}
              onPress={() => props.navigation.navigate("ChatStack")}
            >
              <Icon name="chatbubbles" />
              <Text>Chat</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);
