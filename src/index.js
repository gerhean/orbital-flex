import React, { Component } from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AppLoading } from "expo";
import * as Font from "expo-font";
import firebaseApp from './firebase';

import AuthNavigator from "./components/Navigation/AuthNav";
import store, { persistor } from "./store";

class AppWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async UNSAFE_componentWillMount() {
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
      <Root>
        <Provider store={store}>
          <PersistGate loading={<AppLoading />} persistor={persistor}>
            <AuthNavigator />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

export default AppWrapper;
