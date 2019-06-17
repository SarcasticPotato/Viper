import * as React from 'react';
import {Container, Content, Header, List, ListItem, ScrollableTab, Spinner, Tab, Tabs, Text} from 'native-base';
import {AsyncStorage} from 'react-native';
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
    if(this.state.loading) {
      return (
        <Container>
          <Header />
          <Content>
              <Spinner/>
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <Header hasTabs/>
        <Tabs renderTabBar={() => <ScrollableTab/>}>
          <Tab heading="Information">
            <Content>
              <Text>
                {this.state.package.name}
              </Text>
              <Text>
                {this.state.package.folder}
              </Text>
              <Text>
                {this.state.package.pid}
              </Text>
            </Content>
          </Tab>
          <Tab heading="Links">
            <Content>
              <List>
                {this.state.package.links.map((link) => {
                  return <ListItem>
                    <Text>{link.url}</Text>
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
