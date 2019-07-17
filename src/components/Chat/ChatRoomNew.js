import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    StatusBar,
    View
  } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from './styles.js';
import { createChat, changeScreen } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
    uid: state.user.uid,
  });

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    handleChangeScreen: changeScreen,
    handleCreateChat: createChat,
  },
  dispatch
);

class ChatRoomNew extends Component {
  static propTypes = {
    otherUid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }
    
  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
  
  sendMessage = (messages = []) => {
    this.props.handleCreateChat(messages[0].text, this.props.otherUid)
  }

  // missing back button
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <GiftedChat
          messages={[]}  // array of messages to display
          onSend={this.sendMessage}
          user={{
            _id: this.props.uid,
          }}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomNew);