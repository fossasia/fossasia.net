import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export default class Login extends Component {

  getData = () => {
    const _responseInfoCallback = (error, result) => {
      if (error) {
        console.log('Error fetching data: ' , error);
      } else {
        alert(`welcome ${result.name}`)
      }
    }

    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me',
      null,
      _responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                this.getData()
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />
      </View>
    );
  }
}
