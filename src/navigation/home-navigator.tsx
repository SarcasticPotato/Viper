import React from 'react';
import {createStackNavigator} from 'react-navigation';
import HomeScreen from '../screens/home-screen';
import DetailScreen from '../screens/detail-screen';

export const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailScreen
    }
  }
);
