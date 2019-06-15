import * as React from 'react';
import {Button, Container, Content, Form, Header, Input, Item, Text} from 'native-base';
import {AsyncStorage} from 'react-native';

interface State {
  url: string;
  username: string;
  password: string;
}

export default class LoginScreen extends React.Component<{}, State> {
  static navigationOptions = {
    title: 'Welcome',
  };

  readonly state: State = {
    url: "",
    username: "",
    password: ""
  };

  render() {
    // @ts-ignore
    const {navigate} = this.props.navigation;

    const handleUrlChange = (url: string) => {
      this.setState({url: url});
    };

    const handleUsernameChange = (username: string) => {
      this.setState({username: username});
    };

    const handlePasswordChange = (password: string) => {
      this.setState({password: password});
    };

    return (
      <Container>
        <Header/>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Server URL" value={this.state.url} onChangeText={handleUrlChange}/>
            </Item>
            <Item>
              <Input placeholder="Username" value={this.state.username} onChangeText={handleUsernameChange}/>
            </Item>
            <Item last>
              <Input placeholder="Password" value={this.state.password} onChangeText={handlePasswordChange}/>
            </Item>
            <Button block onPress={this._signInAsync}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    // @ts-ignore
    this.props.navigation.navigate('App');
  };
}
