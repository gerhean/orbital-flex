import React, { Component } from "react";
// import { View, StyleSheet } from 'react-native';
import {
  Container,
} from "native-base";
import SearchSchedules from './SearchSchedules';

export default class Search extends Component {
  render() {
    return (
      <Container>
        <SearchSchedules />
      </Container>
    );
  }
}




