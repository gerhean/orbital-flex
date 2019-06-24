import React, { Component } from "react";
// this will be used to make your Android hardware Back Button work
import { Platform, BackHandler } from "react-native";
import { Provider, connect } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import AuthNavigator from "./components/Navigation/AuthNav";
import store, { persistor } from "./store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { FirebaseContext } from "./firebase";

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
    this.setState({ isReady: true });
  } // fix compatibility error between native base and expo

  render() {
    if (!this.state.isReady) {
      return <AppLoading onError={console.warn} />;
    }

    // the loading and persistor props are both required!
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <AuthNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;
