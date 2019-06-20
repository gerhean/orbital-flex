import React, { Component } from 'react'
// this will be used to make your Android hardware Back Button work
import { Platform, BackHandler } from 'react-native'
import { Provider, connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
// this is your root-most navigation stack that can nest
// as many stacks as you want inside it
import AuthSwitchNavigator from './navigation/AuthSwitch'
// this is a plain ol' store
// same as const store = createStore(combinedReducers)
import store from './store'
import Firebase, { FirebaseContext } from './firebase';

class Root extends Component {
	render () {
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