import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import ChatStack from './ChatStack';

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  ChatStack,
});