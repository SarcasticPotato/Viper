import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import HomeScreen from '../screens/home-screen';

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    }
  }
);
