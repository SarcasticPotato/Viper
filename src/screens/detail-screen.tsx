import * as React from 'react';
import {
  Body,
  Button, Col,
  Container,
  Content, Grid, H3,
  Header,
  Icon,
  Left,
  List,
  ListItem, Row,
  ScrollableTab,
  Spinner,
  Tab,
  Tabs,
  Text,
  Title
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Package} from '../api/model/package';

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
        let formData = new FormData();
        // @ts-ignore
        formData.append("session", JSON.parse(sessionId));
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
          .catch(error => console.log(error)) //to catch the errors if any
      })
    });
  }

  render() {
    // @ts-ignore
    const navigation = this.props.navigation;

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
                  return <ListItem key={link.fid}>
                    <Text>{link.name}</Text>
                  </ListItem>
                })}
              </List>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
