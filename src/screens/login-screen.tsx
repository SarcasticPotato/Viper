import * as React from 'react';
import {Button, Container, Content, Form, Header, Input, Item, Text, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

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
        <Content>
          <Form>
            <Item>
              <Input placeholder="Server URL" value={this.state.url} onChangeText={handleUrlChange}/>
            </Item>
            <Item>
              <Input placeholder="Username" value={this.state.username} onChangeText={handleUsernameChange}/>
            </Item>
            <Item last>
              <Input secureTextEntry placeholder="Password" value={this.state.password} onChangeText={handlePasswordChange}/>
            </Item>
            <Button full success onPress={this._signInAsync}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  showLoginErrorToast = () => {
    Toast.show({
      text: "Login Failed!",
      buttonText: "Okay",
      duration: 3000
    });
  };

  _signInAsync = async () => {
    let formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("password", this.state.password);
    fetch(this.state.url + "/api/login", {
      method: 'POST',
      body: formdata,
    }).then(response => response.text())
      .catch((err) => {
        this.showLoginErrorToast();
      })
      .then(sessionId => {
        if (sessionId) {
          AsyncStorage.setItem('sessionId', sessionId).then(() => {
            AsyncStorage.setItem('serverURL', this.state.url).then(() => {
              // @ts-ignore
              this.props.navigation.navigate('App');
            });
          })
        } else {
          this.showLoginErrorToast();
        }
      })

  };
}
