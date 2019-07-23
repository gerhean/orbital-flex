import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { BackHandler } from "react-native";
import { connect } from "react-redux";

import { changePreviousScreen } from "../../actions";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import AppNav from "./AppNav";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  screen: state.screen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigatePreviousScreen: changePreviousScreen, 
    },
    dispatch
  );

export class AuthNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.navigatePreviousScreen);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.navigatePreviousScreen);
  }

  render() {
    if (this.props.isAuthenticated) {
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthNav);