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

const mapStateToProps = state => ({
    user: state.user,
    current_room: state.current_room,
    messages: state.messages
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
            createdAt: Date.now(),
            user: {
            _id: message.user._id,
            name: message.user.name,
            roomId: this.props.current_room.roomId
            }
        })
    }

    // missing back button
    render() {
        return (
          <View style={{flex: 1}}>
            <StatusBar barStyle="light-content"/>
            <GiftedChat
              messages={this.props.messages}  // array of messages to display
              onSend={this.addMessage.bind(this)}
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