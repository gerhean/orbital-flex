import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Right,
  Left,
  Input,
  Form,
  Item,
  Label,
  Picker,
  Icon
} from "native-base";
import { connect } from "react-redux";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { bindActionCreators } from "redux";
import { updateUserInfo, changeScreen } from "../../actions";
import ChooseImage from './ChooseImage';

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleUpdateInfo: updateUserInfo,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

class UserInfoForm extends Component {
  constructor(props) {
    super(props);
    const { username, contact, about, profilePic, gender } = this.props.user;
    this.state = {
      username,
      contact, 
      about, 
      profilePic, 
      profilePicLocal: '',
      gender
    };
  }

  submitForm = () => {
    const { username, contact, about, profilePic, gender, profilePicLocal } = this.state;
    if (!username) return;
    this.props.handleUpdateInfo({
      username,
      contact, 
      about, 
      profilePic,
      gender
    }, profilePicLocal);
  };

  setValue = key => value => {
    this.setState({
      [key]: value
    })
  };

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Edit User Info</Title>
          </Body>
          <Right>
            <Button onPress={this.navigate("Home")}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                maxLength={17}
                value={this.state.username}
                onChangeText={this.setValue("username")}
              />
            </Item>

            <ChooseImage 
              urlLabel="Enter Profile Picture URL below or upload from phone"
              localImage={this.state.profilePicLocal}
              urlImage={this.state.profilePic}
              handleChangeLocalImg={this.setValue("profilePicLocal")}
              handleChangeUrlImg={this.setValue("profilePic")}
            />

            <Item picker fixedLabel>
              <Label>Gender</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.gender}
                onValueChange={this.setValue("gender")}
              >
                <Picker.Item label="Prefer not to say" value={0} />
                <Picker.Item label="Male" value={1} />
                <Picker.Item label="Female" value={2} />
              </Picker>
            </Item>

            <Item stackedLabel>
              <Label>Contact</Label>
              <Input
                value={this.state.contact}
                onChangeText={this.setValue("contact")}
              />
            </Item>

            <Item stackedLabel>
              <Label>About</Label>
              <Input
                maxLength={200}
                value={this.state.about}
                onChangeText={this.setValue("about")}
              />
            </Item>
            
          </Form>
          <Button rounded block bordered onPress={this.submitForm}>
            <Text>Submit</Text>
          </Button>
          <KeyboardSpacer/>
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoForm);
