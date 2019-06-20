import React, { Component } from 'react'
// this will be used to make your Android hardware Back Button work
import { Platform, BackHandler } from 'react-native'
import { Provider, connect } from 'react-redux'
import { AppLoading } from "expo";
import * as Font from 'expo-font';

import AuthSwitchNavigator from './navigation/AuthSwitch'
import store from './store'
import Firebase, { FirebaseContext } from './firebase';

class Root extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../assets/fonts/Roboto-Black.ttf"),
      Roboto_medium: require("../assets/fonts/Roboto-Medium.ttf")
    });
    this.setState({ isReady: true })
  } // fix compatibility error between native base and expo

	render () {
		if (!this.state.isReady) {
			return (
				<AppLoading
          onError={console.warn}
        />
			);
		}

		return (
		  <Provider store={store}>
				<FirebaseContext.Provider value={new Firebase()}>
		        <AuthSwitchNavigator />
		  	</FirebaseContext.Provider>
		  </Provider>
		);
	}
} 

export default Root