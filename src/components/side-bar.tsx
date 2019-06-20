import React from "react";
import {Button, Container, Content, Footer, FooterTab, Icon, List, ListItem, Text} from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

const routes = ["Home", "Queue"];

export default class SideBar extends React.Component<{ navigation: any }> {
  render() {
    // @ts-ignore
    const navigation = this.props.navigation;

    const _logout = () => {
      AsyncStorage.clear();
      navigation.navigate('Auth')
    };

    return (
      <Container>
        <Content>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => _logout()}>
              <Icon name="log-out" /><Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
