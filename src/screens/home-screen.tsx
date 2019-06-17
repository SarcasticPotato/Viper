import * as React from 'react';
import {Body, Button, Container, Content, Drawer, Header, Icon, Left, List, Spinner, Title} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {QueueItem} from '../api/model/queueItem';
import {QueueItemComponent} from '../components/queue-item';
import SideBar from '../components/side-bar';

interface State {
  url: string | null;
  sessionId: string | null;
  loading: boolean;
  queueData: QueueItem[];
}

export default class HomeScreen extends React.Component<{}, State> {
  drawer: any;

  constructor(props: Object) {
    super(props);
    this.state = {
      url: null,
      sessionId: null,
      loading: true,
      queueData: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("serverURL").then(url => {
      AsyncStorage.getItem("sessionId").then(sessionId => {
        let formData = new FormData();
        // @ts-ignore
        formData.append("session", JSON.parse(sessionId));
        fetch(url + "/api/getQueue",
          {
            method: 'POST',
            body: formData
          }
        )
          .then(response => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              url: url,
              queueData: responseJson,
              sessionId: sessionId
            })
          })
          .catch(error => console.log(error)) //to catch the errors if any
      })
    });
  }

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
              <Title>Overview</Title>
            </Body>
          </Header>
          {this.state.loading &&
          <Content>
              <Spinner/>
          </Content>
          }
          <Content padder>
            <List>
              {this.state.queueData.map((item) => <QueueItemComponent item={item} navigation={navigation} key={item.pid}/>)}
            </List>
          </Content>
        </Container>
      </Drawer>
    );
  }

  _navigateToDetails = (pid: string) => {
    // @ts-ignore
    this.props.navigation.navigate("Details", {
      pid: pid
    })
  }
}
