import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Left,
} from "native-base";
import SearchSchedules from './SearchSchedules';

export default class Search extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Search</Title>
          </Body>
          <Right/>
        </Header>
        <SearchSchedules />
      </Container>
    );
  }
}




