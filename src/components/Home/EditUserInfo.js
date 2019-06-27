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
  Item
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
              <Text>Username</Text>
              <Input
                value={this.state.username}
                onChangeText={text =>
                  this.setState({
                    username: text
                  })
                }
              />
            </Item>
            <Item floatingLabel>
              <Text>Profile Picture URL</Text>
              <Input
                value={this.state.profilePic}
                onChangeText={text =>
                  this.setState({
                    profilePic: text
                  })
                }
              />
            </Item>
            <Item floatingLabel>
              <Text>Contact</Text>
              <Input
                placeholder="Contact"
                value={this.state.contact}
                onChangeText={text =>
                  this.setState({
                    contact: text
                  })
                }
              />
            </Item>
            <Item floatingLabel>
              <Text>About</Text>
              <Input
                placeholder="About"
                value={this.state.about}
                onChangeText={text =>
                  this.setState({
                    about: text
                  })
                }
              />
            </Item>
            <Item floatingLabel>
              <Text>Gender</Text>
              <Input
                placeholder="Gender"
                value={this.state.gender}
                onChangeText={text =>
                  this.setState({
                    gender: text
                  })
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
