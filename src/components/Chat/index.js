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
  Right
} from "native-base";
import Expo from "expo";
import firebase from "firebase";

//needs log out button

class Home extends Component {
  render() {

    return (
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button onPress={() => firebase.auth().signOut()}>
              <Text>Log out</Text>
            </Button>
          </Right>
        </Header>
        <Content>
            <Body style={styles.bodyStyle}>
              <Text>Implementation in progress</Text>
            </Body>
        </Content>
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

export default Home;
