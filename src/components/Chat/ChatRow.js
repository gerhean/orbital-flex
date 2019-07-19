import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import moment from 'moment';

import profilePictureDisplay from '../profilePictureDisplay';
import { changeScreen, fetchUserInfo } from "../../actions";

const mapStateToProps = (state, ownProps) => {
  const uid = state.chat.chatrooms[ownProps.roomId].otherUid;
  return {
    uid: uid,
    user: state.users[uid],
    room: state.chat.chatrooms[ownProps.roomId],
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
    },
    dispatch
  );

class ChatRow extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
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
    if (!user) return null;
    const lastMessage = this.props.room.messages[0]
    return (
      <ListItem avatar button onPress={this.navigate("Chatroom/" + this.props.roomId)}>
        <Left>
          {profilePictureDisplay(user.profilePic)}
        </Left>
        <Body>
          <Text>{user.username}</Text>
          <Text note>{lastMessage.text}</Text>
        </Body>
        <Right>
          <Text note>{miliToTimeStr(lastMessage.createdAt)}</Text>
        </Right>
      </ListItem>
    );
  }
}

const miliToTimeStr = (milisecs) => {
  const m = moment(new Date(milisecs));
  if (Date.now() - milisecs < 86400000) {
    return m.format("hh:mm a");
  } else {
    return m.format("DD/MM/YYYY");
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRow);