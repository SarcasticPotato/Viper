import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import HomeScreen from '../screens/home-screen';
import DetailScreen from '../screens/detail-screen';

export const HomeNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Details: {
      screen: DetailScreen
    }
  }
);
