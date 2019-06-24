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
  Right
} from "native-base";
import Expo from "expo";
import firebase from "firebase";
import Schedule from "./Schedule";

//needs log out button

class Home extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Search bar</Title>
          </Body>
          <Right>
            <Button onPress={() => firebase.auth().signOut()}>
              <Text>Log out</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Schedule />
        </Content>
      </Container>
    );
  }
}

export default Home;
