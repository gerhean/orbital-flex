import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import firebase from 'firebase';

class Register extends Component {
  
  state = { email: "", password: "", error: "" }
  
  showError() {
    this.setState({ error: 'This email has already been registered'});
  }
  
  onButtonPress() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(() => this.showError.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>{ this.state.error }</Text>
          <Input placeholder = "Email"
                 value = { this.state.email }
                 onChangeText={ email => this.setState({ email })} />
          <Input placeholder = "Password"
                 secureTextEntry
                 value = { this.state.password }
                 onChangeText={ password => this.setState({ password })} />
          <Button onPress={this.onButtonPress.bind(this)}
                  buttonStyle={styles.buttonStyle}  title="Create account"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    margin: 5
  }
})



export default Register;