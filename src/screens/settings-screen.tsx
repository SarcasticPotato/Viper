import * as React from 'react';
import {Body, Button, Container, Drawer, Header, Icon, Left, Title} from 'native-base';
import SideBar from '../components/side-bar';

export default class SettingsScreen extends React.Component {
  drawer: any;

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    // @ts-ignore
    const navigation = this.props.navigation;
    return (
      <Drawer
        ref={(ref) => {
          this.drawer = ref
        }}
        content={<SideBar navigation={navigation}/>}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.openDrawer()}>
                <Icon name="menu"/>
              </Button>
            </Left>
            <Body>
              <Title>Settings</Title>
            </Body>
          </Header>
        </Container>
      </Drawer>
    );
  }
}
