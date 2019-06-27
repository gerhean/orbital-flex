import React, { Component } from "react";
//import { FlatList } from 'react-native';
import {
  Text,
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
  Icon
} from "native-base";
import Expo from "expo";
import firebase from "firebase";
// import Schedule from "./Schedule";

//needs log out button

class Home extends Component {
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

      </Container>
    );
  }
}

export default Home;
