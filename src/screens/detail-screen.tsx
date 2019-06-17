import * as React from 'react';
import {Container, Content, Header, Text} from 'native-base';

export default class DetailScreen extends React.Component<{}> {

  render() {
    // @ts-ignore
    const { params } = this.props.navigation.state;
    const pid = params ? params.pid: null;
    return (
      <Container>
        <Header/>
        <Content>
          <Text>
            {pid}
          </Text>
        </Content>
      </Container>
    );
  }
}
