import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Button, Input } from "react-native-elements";
import { AppLoading } from "expo";
import firebase from 'firebase';

import { loginEmail, loginInitialize, changeScreen, logout } from "../../actions";

const mapStateToProps = state => ({
  authError: state.auth.error,
  authLoading: state.auth.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { 
      handleLogin: loginInitialize,
      handleEmailLogin: loginEmail,
      handleChangeScreen: changeScreen,
      handleLogout: logout,
    },
    dispatch
  );

const initialState = {
  email: "",
  password: ""
};

class LoginBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.handleLogin();
      } else {
        this.props.handleLogout();
      }
    });
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  onButtonPress = () => {
    const { email, password } = this.state;
    this.props.handleEmailLogin({ email, password });
  };

  render() {
    if (this.props.authLoading) {
      return <AppLoading onError={console.warn} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Icon name="heartbeat" type="font-awesome" color="#f50" />
          <Text style={styles.textStyle}>Welcome to Flex</Text>
          <Text style={styles.textStyle}>Find fitness trainers near you</Text>
        </View>

        <View>
          <Text>{this.state.error}</Text>
          <Text>{this.props.authError}</Text>
          <Input
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={this.onButtonPress}
            title="Login"
          />
          <Button
            buttonStyle={styles.buttonStyle}
            onPress={this.navigate("Register")}
            title="Create new account"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F51B5"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  buttonStyle: {
    margin: 5,
    backgroundColor: '#607D8B'
  },
  textStyle: {
    color: "#c5cae9",
    fontStyle: "italic",
    fontSize: 25
  },
  errorStyle: {
    color: "#c5cae9",
    fontSize: 10
  }
});

// const Login = withFirebase(LoginBase);
// const Login = LoginBase;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBase);
