import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native';
import FadeIn from '@expo/react-native-fade-in-image';
import layout from './layout';

// '../../../assets/ExpoHollow.png'

export default class ListItem extends Component {
  render() {
    let { name, posterName, day,
       timeStart, timeEnd, remarks,
       location, services, price, 
      } = this.props.item;
    return (
      <View style={ styles.mainContainer }>
        <Image
                resizeMode="cover"
                source={image}
                style={styles.avatar}
        />
        <view style={styles.infoContainer}>
          <Text style={styles.title}>
            {name}
          </Text>
          <Text style={styles.info}>
            {posterName}
          </Text>
          <Text style={styles.info}>
            {day}
          </Text>
          <Text style={styles.info}>
            {location}
          </Text>
          <Text style={styles.info}>
            {services}
          </Text>
          <Text style={styles.info}>
            {price}
          </Text>
        </view>
      </View>
    );
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
  title: {
    fontSize: 22,
  },
  info: {
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