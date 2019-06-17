import React from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View,} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let sessionId = await AsyncStorage.getItem("sessionId");
    let url = await AsyncStorage.getItem("serverURL");
    let formData = new FormData();
    // @ts-ignore
    formData.append("session", JSON.parse(sessionId));
    let userDetails = await fetch(url + "/api/getAllUserData",{
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    });
    console.log(userDetails);
    const isLoggedIn = sessionId && url && userDetails.status >= 200 && userDetails.status < 300;
    console.log(isLoggedIn);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // @ts-ignore
    this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator/>
        <StatusBar barStyle="default"/>
      </View>
    );
  }
}
