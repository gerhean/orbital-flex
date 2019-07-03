/*
import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';
// import FadeIn from '@expo/react-native-fade-in-image';
import layout from './layout';

// needs to change according to our items from the index

export default class ListItem extends Component {
  render() {
    let { name,
      image,
      day,
      timeStart,
      timeEnd,
      location,
      services,
      price } = this.props.item;
    return (
      <View style={styles.mainContainer}>
          <View style={styles.avatarContainer}>
              <Image
                resizeMode="cover"
                source={require('../../../assets/ExpoHollow.png')}
                style={styles.avatar}
              />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.services}>
              { services }
            </Text>
            <Text style={styles.name}>
              { name }
            </Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: layout.window.width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgb(200, 199, 204)'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  services: {
    fontSize: 22,
  },
  name: {
    fontSize: 14,
    color: '#205070'
  },
  avatarContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: 'gray',
    borderWidth: 1,
  }
})
*/