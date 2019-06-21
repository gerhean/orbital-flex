import React, { Component } from 'react';
import Provider from 'react-redux';
import { View } from 'react-native';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from '../../reducers';
import Schedule from './Schedule';

class Home extends Component {
    render() {
        return(
            <Provider store={ createStore(reducers) }>
                <View>
                    <Schedule />
                </View>
            </Provider>

        );
    }
}

export default Home;
