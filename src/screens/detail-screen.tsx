import * as React from 'react';
import {Container, Content, Header, Text} from 'native-base';
import {QueueItem} from '../api/model/queueItem';

interface Props {
  pid: string;
}

export default class DetailScreen extends React.Component<Props> {

  render() {
    const pid = this.props.pid;
    return (
      <Container>
        <Header/>
        <Content>
          <Text>
            {this.props.pid}
          </Text>
        </Content>
      </Container>
    );
  }
}
