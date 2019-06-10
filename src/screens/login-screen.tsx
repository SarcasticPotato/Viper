import * as React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {AsyncStorage} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    // @ts-ignore
    const {navigate} = this.props.navigation;

    return (
      <Button onPress={this._signInAsync}>
        <Text>
          Login
        </Text>
      </Button>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    // @ts-ignore
    this.props.navigation.navigate('App');
  };
}
