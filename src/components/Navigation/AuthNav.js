import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { View } from "react-native";
import { connect } from "react-redux";
// import firebase from 'react-native-firebase';
import firebase from 'firebase';
import { AppLoading } from 'expo';

import { initializeApp } from "../../actions";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import AppNav from "./AppNav";

const mapStateToProps = state => ({
  loading: state.initializingApp,
  isAuthenticated: state.auth.isAuthenticated,
  screen: state.screen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleInitializeApp: initializeApp,
    },
    dispatch
  );

export class AuthNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleInitializeApp();
  }

  renderContent = () => {
    if (!this.props.loading) {
      return <AppLoading onError={console.warn} />;
    } else if (this.props.isAuthenticated) {
      return <AppNav />;
    } else {
      switch (this.props.screen) {
        case "Login":
          return <Login />;
        case "Register":
          return <Register />;
        default:
          return <Login />;
      }
    }
  }

  render() {
    return(
      this.renderContent()
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthNav);