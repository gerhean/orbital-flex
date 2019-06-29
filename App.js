import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
const window = undefined;

// remove yellow box warnings
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import AppWrapper from "./src/index.js";

export default App = () => {
  return (
    <AppWrapper />
  );
}