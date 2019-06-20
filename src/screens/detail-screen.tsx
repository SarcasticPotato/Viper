import * as React from 'react';
import {
  ActionSheet,
  Body,
  Button,
  Card,
  CardItem,
  Col,
  Container,
  Content,
  Grid,
  H3,
  Header,
  Icon,
  Left,
  List,
  Right,
  Row,
  ScrollableTab,
  Spinner,
  Tab,
  Tabs,
  Text,
  Title,
  Toast
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Package} from '../api/model/package';

var BUTTONS = ["Restart Package", "Delete Package", "Refresh", "Cancel"];
var CANCEL_INDEX = 3;

interface State {
  url: string | null;
  sessionId: string | null;
  loading: boolean;
  package: Package;
}

export default class DetailScreen extends React.Component<{}, State> {

  constructor(props: Object) {
    super(props);
    this.state = {
      url: null,
      sessionId: null,
      loading: true,
      package: {
        pid: 0,
        links: []
      }
    }

  }

  componentDidMount() {
    // @ts-ignore
    const {params} = this.props.navigation.state;
    const pid = params ? params.pid : 0;
    AsyncStorage.getItem("serverURL").then(url => {
      AsyncStorage.getItem("sessionId").then(sessionId => {
        this.loadDetails(JSON.parse(sessionId ? sessionId : ""), url, pid)
      })
    });
  }

  loadDetails = async (sessionId: string | null, url: string | null, pid: number) => {
    this.setState({loading: true});
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", sessionId);
    fetch(url + "/api/getPackageData/" + pid,
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
          sessionId: sessionId,
          package: responseJson
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      })
  };

  restartPackage = async (pid: number) => {
    let formData = new FormData();
    formData.append("session", this.state.sessionId);
    fetch(this.state.url + "/api/restartPackage/" + pid,
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.text())
      .then((response) => {
        if (response) {
          Toast.show({
            text: "Successfully restarted package",
            buttonText: "Okay",
            duration: 3000
          });
        }
        this.loadDetails(this.state.sessionId, this.state.url, pid);
      })
      .catch(error => console.log(error))
  };

  deletePackage = async (pid: number) => {
    // @ts-ignore
    const navigation = this.props.navigation;
    let formData = new FormData();
    formData.append("session", this.state.sessionId);
    fetch(this.state.url + "/api/deletePackages/[" + pid + "]",
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.text())
      .then((response) => {
        if (response) {
          Toast.show({
            text: "Successfully removed package",
            buttonText: "Okay",
            duration: 3000
          });
        }
        navigation.goBack();
      })
      .catch(error => console.log(error))
  };

  restartItem = (fid: number) => {
    let formData = new FormData();
    formData.append("session", this.state.sessionId);
    fetch(this.state.url + "/api/restartFile/" + fid,
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.text())
      .then((response) => {
        if (response) {
          Toast.show({
            text: "Success",
            buttonText: "Okay",
            duration: 3000
          });
        }
        this.loadDetails(this.state.sessionId, this.state.url, this.state.package.pid);
      })
      .catch(error => console.log(error))
  };

  deleteItem = (fid: number) => {
    let formData = new FormData();
    formData.append("session", this.state.sessionId);
    fetch(this.state.url + "/api/deleteFiles/[" + fid + "]",
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.text())
      .then((response) => {
        if (response) {
          Toast.show({
            text: "Success",
            buttonText: "Okay",
            duration: 3000
          });
        }
        this.loadDetails(this.state.sessionId, this.state.url, this.state.package.pid);
      })
      .catch(error => console.log(error))
  };

  render() {
    // @ts-ignore
    const navigation = this.props.navigation;
    // @ts-ignore
    const {params} = this.props.navigation.state;
    const pid = params ? params.pid : 0;

    if (this.state.loading) {
      return (
        <Container>
          <Header/>
          <Content>
            <Spinner/>
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' onPress={() => navigation.goBack()}/>
            </Button>
          </Left>
          <Body>
            <Title>Details</Title>
          </Body>

          <Right>
            <Button transparent onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: "Queue Actions"
                },
                buttonIndex => {
                  switch (buttonIndex) {
                    case 0:
                      this.restartPackage(pid);
                      break;
                    case 1:
                      this.deletePackage(pid);
                      break;
                    case 2:
                      this.loadDetails(this.state.sessionId, this.state.url, pid);
                      break;
                  }
                }
              )}>
              <Icon name='more'/>
            </Button>
          </Right>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab/>}>
          <Tab heading="Information">
            <Content padder>
              <Grid>
                <Row>
                  <Col>
                    <H3>
                      Name
                    </H3>
                  </Col>
                  <Col>
                    <Text>
                      {this.state.package.name}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <H3>
                      Folder
                    </H3>
                  </Col>
                  <Col>
                    <Text>
                      {this.state.package.folder}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <H3>
                      ID
                    </H3>
                  </Col>
                  <Col>
                    <Text>
                      {this.state.package.pid}
                    </Text>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <H3>
                      Links
                    </H3>
                  </Col>
                  <Col>
                    <Text>
                      {this.state.package.links.filter(link => link.status == 0).length}/{this.state.package.links.length}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </Content>
          </Tab>
          <Tab heading="Links">
            <Content>
              <List>
                {this.state.package.links.map((link) => {
                  return <Card key={link.fid}>
                    <CardItem header bordered>
                      <Text>{link.name}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text>{link.statusmsg}</Text>
                      </Body>
                    </CardItem>
                    <CardItem footer bordered>
                      <Button transparent onPress={() => this.restartItem(link.fid)}>
                        <Icon active name="refresh"/>
                        <Text>Restart</Text>
                      </Button>

                      <Button transparent danger  onPress={() => this.deleteItem(link.fid)}>
                        <Icon active name="close"/>
                        <Text>Delete</Text>
                      </Button>
                    </CardItem>
                  </Card>
                })}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
