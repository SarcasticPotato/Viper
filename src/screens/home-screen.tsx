import * as React from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, List, Right, Spinner, Title} from 'native-base';
import {AsyncStorage} from 'react-native';
import {QueueItem} from '../api/model/queueItem';
import {QueueItemComponent} from '../components/queue-item';

interface State {
  url: string | null;
  sessionId: string | null;
  loading: boolean;
  queueData: QueueItem[];
}

export default class HomeScreen extends React.Component<{}, State> {
  static navigationOptions = {
    title: 'Viper',
  };

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
            console.log(responseJson);
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

  render() {

    // @ts-ignore
    let navigation = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right/>
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
    );
  }

  _navigateToDetails = (pid: string) => {
    // @ts-ignore
    this.props.navigation.navigate("Details", {
      pid: pid
    })
  }
}
