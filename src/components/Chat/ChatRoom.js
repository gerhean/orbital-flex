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
    user: state.user,
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
    
    navigate = screen => () => {
        this.props.handleChangeScreen(screen);
      };
    
    addMessage(messageObj = {}) {
        message = messageObj[0]
        this.props.handleSendMessage({
            text: message.text,
            roomId: this.props.roomId, //!
            otherUid: this.props.room.otherUid,
        })
    }

    // missing back button
    render() {
        return (
          <View style={{flex: 1}}>
            <StatusBar barStyle="light-content"/>
            <GiftedChat
              messages={this.props.room.messages}  // array of messages to display
              onSend={this.addMessage}
              user={{
                _id: this.props.user.uid,
                name: this.props.user.username,
              }}
            />
          </View>
        );
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);