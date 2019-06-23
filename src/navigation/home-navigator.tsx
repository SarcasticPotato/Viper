import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import HomeScreen from '../screens/home-screen';
import DetailScreen from '../screens/detail-screen';
import QueueScreen from '../screens/queue-screen';
import SettingsScreen from '../screens/settings-screen';

export const HomeNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Queue: {
      screen: QueueScreen
    },
    Details: {
      screen: DetailScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  }
);
