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
    console.log("navigate to detail page");
    // @ts-ignore
    this.props.navigation.navigate('Details', {pid: this.props.item.pid});
  };

  render() {

    // @ts-ignore
    let item: QueueItem = this.props.item;

    return (
      <ListItem button onPress={(_) => this.goToDetailPage()}>
        <Text>{item.name}</Text>
      </ListItem>
    );
  }
}
