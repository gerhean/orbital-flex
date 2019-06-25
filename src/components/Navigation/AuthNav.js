import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { View } from "react-native";
import { connect } from "react-redux";
import firebase from 'firebase';

import { logout } from "../../actions";
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
      handleLogout: logout,
    },
    dispatch
  );

export class AuthNav extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    if (!user) {
      this.props.handleLogout();
    }
  }

  renderContent = () => {
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