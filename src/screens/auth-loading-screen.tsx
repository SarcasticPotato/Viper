import React from 'react';
import {ActivityIndicator, StatusBar, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let sessionId = await AsyncStorage.getItem("sessionId");
    let url = await AsyncStorage.getItem("serverURL");
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", JSON.parse(sessionId));
    fetch(url + "/api/getAllUserData", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    }).then(res => {
      const isLoggedIn = sessionId && url && res.status >= 200 && res.status < 300;
      // @ts-ignore
      this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth');
    }).catch((err) => {
      // @ts-ignore
      this.props.navigation.navigate('Auth');
    })
  };

  render() {
    return (
      <View>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }
}
