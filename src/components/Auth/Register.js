import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { View, StyleSheet, Text } from "react-native";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from "react-redux";
import { Icon, Button, Input } from "react-native-elements";
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
      username,
      password: passwordOne
    };
    this.props.handleSignup(user);
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "" || passwordOne.length < 6
      || email === "" || username === '';    

    return (
      <View style={styles.container}>
        <Icon name="heartbeat" type="font-awesome" color="#f50" size={60} />
        <Text style={styles.textStyle2}>Signup for Flex</Text>
        <Text>{error}</Text>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          label="Email"
          value={email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          label="Username"
          maxLength={17}
          value={username}
          onChangeText={username => this.setState({ username })}
        />
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          label="Password"
          secureTextEntry
          value={passwordOne}
          onChangeText={passwordOne => this.setState({ passwordOne })}
        />
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          label="Confirm Password"
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
        <KeyboardSpacer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faebd7",
    alignItems: "center",
    justifyContent: "center"
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  buttonStyle: {
    margin: 5,
    backgroundColor: '#cd5c5c',
    width: 160
  },
  textStyle1: {
    color: "#7B1FA2",
    fontSize: 40
  },
  textStyle2: {
    color: "#7B1FA2",
    fontStyle: "italic",
    fontSize: 18
  },
  inputContainerStyle: {
    margin:5
  },
  containerStyle: {
    
  },
  errorStyle: {
    color: "#7B1FA2",
    fontSize: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
