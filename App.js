import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
const window = undefined;
// import firebase from 'firebase';
// import { View } from 'react-native'
// import Login from './src/components/Auth/Login';
// import Home from './src/components/Home';
// import { FIREBASE_CONFIG }from './src/constants';

// export default class App extends Component {
//     //default function()

//     state = { loggedIn: null };

//     componentWillMount() {
//       firebase.initializeApp(FIREBASE_CONFIG);
//       firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//           this.setState({ loggedIn: true });
//         } else {
//           this.setState({ loggedIn: false });
//         }
//       });
//     }

//     renderContent() {
//       switch (this.state.loggedIn) {
//         case true:
//           return <Home />;
//         case false:
//           return <Login />;
//         default:
//           return <Text>Loading... ...</Text>;
//       }
//     }
  
//     render() {
//       return(
//         <View>
//           { this.renderContent() }
//         </View>
//       );
//     }
// }

import AppWrapper from "./src/index.js";

export default App = () => {
  return (
    <AppWrapper />
  );
}