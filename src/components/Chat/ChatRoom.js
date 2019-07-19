import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    StatusBar,
    View
  } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Text, Title, Button } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import styles from './styles.js';
import profilePictureDisplay from '../profilePictureDisplay';
import { sendMessage, changeScreen, changePreviousScreen } from "../../actions";

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
    
  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
  
  sendMessage = (messages = []) => {
    for (const message of messages) {
      console.log(message);
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

  // missing back button
  render() {
    const user = this.props.users[this.props.room.otherUid]
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
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);