import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon, Button, Input } from "react-native-elements";
import { AppLoading } from "expo";
import firebase from 'firebase';
import { loginEmail, loginInitialize, 
    changeScreen, logout, resetPassword } from "../../actions";

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
      handleReset: resetPassword
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

  onButton2Press = () => {
    const { email } = this.state;
    this.props.handleReset({ email });
  };

  render() {
    if (this.props.authLoading) {
      return <AppLoading onError={console.warn} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.textStyle1}>Welcome to Flex</Text>
          <Icon name="heartbeat" type="font-awesome" color="#f50" size={60} />
          <Text style={styles.textStyle2}>Find fitness trainers near you</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text>{this.state.error}</Text>
          <Text>{this.props.authError}</Text>
          <Input
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            label="Password"
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
          <View style={{marginTop: 20}}>
            <Text>Forgot your password?</Text>
            <TouchableOpacity
              onPress={this.onButton2Press}
            >
              <Text style={{color:'#6495ed'}}>Reset password</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    color: "#4b0082",
    fontStyle: "italic",
    fontSize: 40
  },
  textStyle2: {
    color: "#4b0082",
    fontStyle: "italic",
    fontSize: 16
  },
  inputContainerStyle: {
    width: 240,
    paddingLeft: 10,
    margin:5
  },
  containerStyle: {
    
  },
  errorStyle: {
    color: "#7B1FA2",
    fontSize: 10
  }
});

// const Login = withFirebase(LoginBase);
// const Login = LoginBase;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBase);
