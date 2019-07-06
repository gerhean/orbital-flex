import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  ListItem,
  Body,
  Button,
  Right,
  Left,
  View
} from "native-base";
import { changeScreen, fetchUserInfo } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
    },
    dispatch
  );

class UserCard extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.uid);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const user = this.props.user;
    if (!user) {
      return <Text>Loading</Text>
    }
    return (
      <ListItem bordered>
        <Left>
          {profilePictureDisplay(user.profilePic, {large: true})}
        </Left>
        <Body>
          <Text>{user.username}</Text>
          <Text>{user.about}</Text>
          <Button onPress={this.navigate("UserProfile/" + uid)}>
            <Text>View Profile</Text>
          </Button>
        </Body>
      </ListItem>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);