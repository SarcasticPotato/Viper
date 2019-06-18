import * as React from 'react';
import {ListItem, Text} from 'native-base';
import {QueueItem} from '../api/model/queueItem';

interface Props {
  item: QueueItem;
  navigation: any
}

export class QueueItemComponent extends React.Component<Props> {

  constructor(props: any) {
    super(props);
  }

  goToDetailPage = () => {
    this.props.navigation.navigate('Details', {pid: this.props.item.pid});
  };

  render() {
    let item: QueueItem = this.props.item;

    return (
      <ListItem button onPress={(_) => this.goToDetailPage()}>
        <Text>{item.name} ({item.linksdone/item.linkstotal*100}%)</Text>
      </ListItem>
    );
  }
}
