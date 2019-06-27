import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Footer,
  FooterTab,
  Right,
  Left,
  Thumbnail,
  Input,
  Form,
  Item,
  Label,
  Picker,
  Icon
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUserInfo, changeScreen } from "../../actions";

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
      gender
    };
  }

  submitForm = () => {
    const { username, contact, about, profilePic, gender } = this.state;
    this.props.handleUpdateInfo({
      username,
      contact, 
      about, 
      profilePic, 
      gender
    });
  };

  setValue = key => value => {
    this.setState({
      [key]: text
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
              <Text>Discard Changes</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={this.state.username}
                onChangeText={this.setValue("username")})
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Profile Picture URL</Label>
              <Input
                value={this.state.profilePic}
                onChangeText={this.setValue("profilePic"))
                }
              />
            </Item>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
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

            <Item floatingLabel>
              <Label>Contact</Label>
              <Input
                value={this.state.contact}
                onChangeText={this.setValue("contact")}
              />
            </Item>

            <Item floatingLabel>
              <Label>About</Label>
              <Input
                value={this.state.about}
                onChangeText={this.setValue("about"))
                }
              />
            </Item>
            
          </Form>
          <Button onPress={this.submitForm}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoForm);
