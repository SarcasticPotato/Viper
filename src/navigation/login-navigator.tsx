import {createStackNavigator} from 'react-navigation';
import LoginScreen from '../screens/login-screen';

export const SignedOut = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Login"
    }
  }
});
