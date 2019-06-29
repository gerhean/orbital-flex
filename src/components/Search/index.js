import React, { Component } from "react";
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
import firebase from "firebase";
// import Schedule from "./Schedule";

//needs log out button

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

export default Search;
