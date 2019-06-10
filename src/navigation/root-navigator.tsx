import React from "react";
import {createSwitchNavigator} from "react-navigation";
import {SignedIn} from './home-navigator';
import {SignedOut} from './login-navigator';

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
