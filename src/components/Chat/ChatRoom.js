import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StatusBar, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Container, Header, Left, Body, Right, Text, Title, Button } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import profilePictureDisplay from '../profilePictureDisplay';
import { sendMessage, changeScreen, changePreviousScreen, fetchUserInfo } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
    uid: state.user.uid,
    users: state.users,
    room: state.chat.chatrooms[ownProps.roomId],
  });

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    handleChangeScreen: changeScreen,
    handleSendMessage: sendMessage,
    handlePreviousScreen: changePreviousScreen,
    handleFetchUserInfo: fetchUserInfo,
  },
  dispatch
);

class ChatRoom extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
  };
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.room.otherUid);
  }
    
  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
  
  sendMessage = (messages = []) => {
    for (const message of messages) {
      this.props.handleSendMessage({
        text: message.text,
        _id: message._id,
        createdAt: message.createdAt,
        user: message.user,
        roomId: this.props.roomId, 
        otherUid: this.props.room.otherUid,
      })
    }
  }

  render() {
    const user = this.props.users[this.props.room.otherUid]
    if (!user) return null;
    return (
      <Container>
        <Header>
          <Left>
            {profilePictureDisplay(user.profilePic, {small:true})}
          </Left>
          <Body>
            <Title>{user.username}</Title>
          </Body>
          <Right>
            <Button onPress={this.props.handlePreviousScreen}>
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>

        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content"/>
          <GiftedChat
            messages={this.props.room.messages}  // array of messages to display
            onSend={this.sendMessage}
            user={{
              _id: this.props.uid,
            }}
          />
          <KeyboardSpacer/>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);