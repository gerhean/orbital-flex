import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { Icon, Button, Input } from "react-native-elements";
import firebase from "firebase";
import { withFirebase } from "../../firebase";
import { signupInitialize, changeScreen } from "../../actions";

const mapStateToProps = state => ({
  authError: state.auth.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleSignup: signupInitialize,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

const initialState = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: ""
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  onSubmit = () => {
    const { username, email, passwordOne } = this.state;
    const user = {
      email,
      password: passwordOne
    };
    this.props.handleSignup(user);
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || email === "";
    // ||
    // username === '';

    return (
      <View style={styles.container}>
        <Icon name="heartbeat" type="font-awesome" color="#f50" />
        <Text style={styles.textStyle}>Signup for Flex</Text>
        <Text>{error}</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={passwordOne}
          onChangeText={passwordOne => this.setState({ passwordOne })}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          value={passwordTwo}
          onChangeText={passwordTwo => this.setState({ passwordTwo })}
        />
        <Button
          disabled={isInvalid}
          onPress={this.onSubmit}
          buttonStyle={styles.buttonStyle}
          title="Create account"
        />
        <Button
          onPress={this.navigate("Login")}
          buttonStyle={styles.buttonStyle}
          title="Already have an account?"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    color: "#c5cae9",
    fontStyle: "italic",
    fontSize: 25
  },
  buttonStyle: {
    margin: 5
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
