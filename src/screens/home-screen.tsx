import * as React from 'react';
import {Container, Header, Title, Button, Left, Right, Body, Icon, Content, Text} from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Viper',
  };
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>
            This is Content Section
          </Text>
        </Content>
      </Container>
    );
  }
}
