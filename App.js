import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native'
import Login from './src/components/Auth/Login';
import Home from './src/components/Home';
import { FIREBASE_INIT_SETTINGS }from './src/constants';

export default class App extends Component {
    //default function()

    state = { loggedIn: null };

    componentWillMount() {
      firebase.initializeApp(firebaseInitAppSecrets);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

    renderContent() {
      switch (this.state.loggedIn) {
        case true:
          return <Home />;
        case false:
          return <Login />;
        default:
          return <Text>Loading... ...</Text>;
      }
    }
  
    render() {
      return(
        <View>
          { this.renderContent() }
        </View>
      );
    }
}
