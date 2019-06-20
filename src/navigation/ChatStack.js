import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../components/Home';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-chatbubbles'
          : 'md-chatbubbles'
      }
    />
  ),
};

export default HomeStack;