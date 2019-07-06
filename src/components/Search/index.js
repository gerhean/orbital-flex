import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import SearchSchedules from './SearchSchedules';

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SearchSchedules />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

/*
import { View, StyleSheet, Text } from "react-native";
//import { FlatList } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Button,
  Card,
  Content,
  Footer,
  FooterTab,
  Right,
  Icon,
  Input,
  Item
} from "native-base";
import Expo from "expo";
// import Schedule from "./Schedule";

class Search extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Body style={styles.bodyStyle}>
          <Icon type="FontAwesome" name="search"/>
          <Text style={styles.textStyle}>Search for fitness trainers</Text>
        </Body>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#696969',
    fontSize: 25
  },
  bodyStyle: {
    flex: 1,
    justifyContent: 'center'
  }
});
*/

