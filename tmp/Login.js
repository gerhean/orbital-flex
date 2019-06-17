import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import firebase from 'firebase';

class Login extends Component {
  
  state = { email: "", password: "", error: "" }

  showError() {
    this.setState({ error: 'Failed to log in, email/password incorrect'});
  }
  
  onButtonPress() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(() => this.showError.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style ={styles.loginContainer}>
          <Icon
            name='heartbeat'
            type='font-awesome'
            color='#f50' />
            <Text style={styles.textStyle}>Welcome to Flex</Text>
            <Text style={styles.textStyle}>Find fitness trainers near you</Text>
        </View>
        
        <View>
          <Text>{ this.state.error }</Text>
          <Input placeholder = "Email"
                 value = { this.state.email }
                 onChangeText={ email => this.setState({ email })} />
          <Input placeholder = "Password"
                 secureTextEntry
                 value = { this.state.password }
                 onChangeText={ password => this.setState({ password })} />
          <Button buttonStyle={styles.buttonStyle}
                  onPress={this.onButtonPress.bind(this)}
                  title="Login"/>
          <Button buttonStyle={styles.buttonStyle} type="outline" title="Create new account"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loginContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  buttonStyle: {
    margin: 5
  },
  textStyle: {
    color: '#c5cae9',
    fontStyle: 'italic',
    fontSize: 25
  },
  errorStyle: {
    color: '#c5cae9',
    fontSize: 10
  }
})



export default Login;