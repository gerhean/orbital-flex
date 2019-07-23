import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  ListItem,
  Body,
  Button,
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
    let aboutText = user.about;
    if (aboutText.length > 60) {
      aboutText = aboutText.substring(0, 60) + "..."
    } 

    return (
      <ListItem bordered>
        {profilePictureDisplay(user.profilePic, {large: true})}
        <Body>
          <Text style={{fontWeight: "500"}}>{user.username}</Text>
          <Text note>{aboutText}</Text>
          <Button block rounded small onPress={this.navigate("UserProfile/" + this.props.uid)}>
            <Text>View Profile</Text>
          </Button>
        </Body>
      </ListItem>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);