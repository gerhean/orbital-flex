import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native'
import Login from './src/components/Login';
import Home from './src/components/Home';

export default class App extends Component {
    //default function()

    state = { loggedIn: null };

    componentWillMount() {
      firebase.initializeApp({
        apiKey: "AIzaSyAUZHRWTZT2C0BwQLrHZ47hofTG6QYAts0",
        authDomain: "orbital-f4d45.firebaseapp.com",
        databaseURL: "https://orbital-f4d45.firebaseio.com",
        projectId: "orbital-f4d45",
        storageBucket: "orbital-f4d45.appspot.com",
        messagingSenderId: "393318681488",
        appId: "1:393318681488:web:4ff8739acff21293"
      });
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

