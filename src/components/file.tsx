import * as React from 'react';
import {Body, Button, Card, CardItem, Icon, Text, Toast} from "native-base";
import {File} from '../api/model/file';

interface Props {
  sessionId: string | null;
  url: string | null;
  file: File;
  _handleDelete: Function;
}

interface State {
  file: File;
}

export class FileComponent extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      file: this.props.file
    }
  }

  loadFile = (fid: number) => {
    let formData = new FormData();
    formData.append("session", this.props.sessionId);
    fetch(this.props.url + "/api/getFileData/" + fid,
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        this.setState({file: response})
      })
      .catch(error => console.log(error))
  };

  restartItem = (fid: number) => {
    let formData = new FormData();
    formData.append("session", this.props.sessionId);
    fetch(this.props.url + "/api/restartFile/" + fid,
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
          this.loadFile(fid);
        }
      })
      .catch(error => console.log(error))
  };

  deleteItem = (fid: number) => {
    let formData = new FormData();
    formData.append("session", this.props.sessionId);
    fetch(this.props.url + "/api/deleteFiles/[" + fid + "]",
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
        this.props._handleDelete(fid);
      })
      .catch(error => console.log(error))
  };

  render() {
    let file: File = this.state.file;

    return (
      <Card key={file.fid}>
        <CardItem header bordered>
          <Text>{file.name}</Text>
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>Status: {file.statusmsg}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Button transparent onPress={() => this.restartItem(file.fid)}>
            <Icon active name="refresh"/>
            <Text>Restart</Text>
          </Button>

          <Button transparent danger onPress={() => this.deleteItem(file.fid)}>
            <Icon active name="close"/>
            <Text>Delete</Text>
          </Button>
        </CardItem>
      </Card>
    )
  }
}
