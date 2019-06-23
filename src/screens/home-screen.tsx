import * as React from 'react';
import {Body, Button, Container, Content, Drawer, Header, Icon, Left, List, ListItem, Spinner, Text, Title, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {QueueItem} from '../api/model/queueItem';
import SideBar from '../components/side-bar';
import {RefreshControl} from 'react-native';
import {File} from '../api/model/file';

interface State {
  url: string | null;
  sessionId: string | null;
  loading: boolean;
  queueData: QueueItem[];
  downloads: File[];
  refreshing: boolean;
}

var BUTTONS = ["Restart Failed", "Delete Finished", "Refresh", "Cancel"];
var CANCEL_INDEX = 3;

export default class HomeScreen extends React.Component<{}, State> {
  drawer: any;

  constructor(props: Object) {
    super(props);
    this.state = {
      url: null,
      sessionId: null,
      loading: true,
      queueData: [],
      downloads: [],
      refreshing: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("serverURL").then(url => {
      AsyncStorage.getItem("sessionId").then(sessionId => {
        this.loadQueue(JSON.parse(sessionId ? sessionId : ""), url);
        this.getDownloadStatus(JSON.parse(sessionId ? sessionId : ""), (url ? url : ""));
      })
    });
  }

  getDownloadStatus = async (sessionId: string, url: string) => {
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", sessionId);
    fetch(url + "/api/statusDownloads",
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: false,
          url: url,
          downloads: responseJson,
          sessionId: sessionId
        })
      })
  };

  loadQueue = async (sessionId: string | null, url: string | null) => {
    this.setState({loading: true});
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", sessionId);
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
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      })
  };

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  restartFailed = () => {
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", this.state.sessionId);
    fetch(this.state.url + "/api/restartFailed",
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.text())
      .then((response) => {
        if (response) {
          Toast.show({
            text: "Restart Failed Successful",
            buttonText: "Okay",
            duration: 3000
          });
          this.loadQueue(this.state.sessionId, this.state.url);
        }
      })
      .catch(error => console.log(error))
  };

  deleteFinished = () => {
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", this.state.sessionId);
    fetch(this.state.url + "/api/deleteFinished",
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.text())
      .then((response) => {
        if (response) {
          Toast.show({
            text: "Successfully deleted finished downloads",
            buttonText: "Okay",
            duration: 3000
          });
        }
        this.loadQueue(this.state.sessionId, this.state.url);
      })
      .catch(error => console.log(error))
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.loadQueue(this.state.sessionId, this.state.url).then(() => this.setState({refreshing: false}));
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
          <Content padder refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()}/>}>
            {this.state.downloads.length == 0 &&
            <Text>No active downloads found!</Text>
            }
            <List>
              {this.state.downloads.map((file) => <ListItem><Text>{file.name}</Text></ListItem>)}
            </List>
          </Content>
        </Container>
      </Drawer>
    );
  }
}
