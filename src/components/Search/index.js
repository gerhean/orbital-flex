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
  Icon,
  Input
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

      </Container>
    );
  }
}

export default Search;
