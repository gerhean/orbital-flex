import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    StatusBar,
    View
  } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from './styles.js';
import { sendMessage, changeScreen } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
    uid: state.user.uid,
    room: state.chat.chatrooms[ownProps.roomId],
  });

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    handleChangeScreen: changeScreen,
    handleSendMessage: sendMessage,
  },
  dispatch
);

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }
    
  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
  
  sendMessage(messages = []) {
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
    return (
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);