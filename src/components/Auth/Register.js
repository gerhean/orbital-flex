import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import firebase from 'firebase';
import { withFirebase } from '../../firebase';

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
  };

  showError = () => {
    this.setState({ 
      error: 'This email has already been registered'
    });
  };

  navigate = (screen) => () => {
    console.log("hi");
    console.log(this.props.navigation.navigate);
    // this.props.navigation.navigate(screen);
  };
  
  onSubmit = () => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...initialState });
        console.log(authUser);
      })
      .catch(error => {
        console.log(error.message);
        this.setState({ error: error.message });
      });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' 
      // ||
      // username === '';

    return (
      <View style={styles.container}>
          <Text>{ error }</Text>
          <Input 
            placeholder = "Email"
            value = { email }
            onChangeText={ email => this.setState({ email })} 
          />
          <Input 
            placeholder = "Password"
            value = { passwordOne }
            onChangeText={ passwordOne => this.setState({ passwordOne })} 
          />
          <Input 
            placeholder = "Confirm Password"

            value = { passwordTwo }
            onChangeText={ passwordTwo => this.setState({ passwordTwo })} 
          />
          <Button 
            disabled={isInvalid}
            onPress={this.onSubmit}
            buttonStyle={styles.buttonStyle}  
            title="Create account"
          />
          <Button 
            onPress={this.navigate('Login')}
            buttonStyle={styles.buttonStyle}  
            title="Already have an account?"
          />

      </View>
    );
  }
}

const Register = withFirebase(SignUpForm);

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