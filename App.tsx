import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './src/screens/login-screen';
import AuthLoadingScreen from './src/screens/auth-loading-screen';
import * as React from 'react';
import {HomeNavigator} from './src/navigation/home-navigator';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = HomeNavigator;
const AuthStack = createStackNavigator({SignIn: LoginScreen});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {
  render() {
    /* In the root component we are rendering the app navigator */
    return <AppContainer/>;
  }
}
