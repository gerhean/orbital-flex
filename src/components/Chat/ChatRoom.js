import React, { Component } from "react";
import { View, Text, FlatList, Button, 
  StyleSheet, ActivityIndicator,
  TouchableOpacity, Alert } from "react-native";
import { GiftedChat, Send, Message } from "react-native-gifted-chat"; // for the chat UI
import { ChatManager, TokenProvider } from "@pusher/chatkit-client"; // for implementing chat functionality
import {CHATKIT_INSTANCE_LOCATOR, CHATKIT_TOKEN_PROVIDER_ENDPOINT} from '../../../env';

// needs to add 1. header(navigate back), 2.a way for user to add another user to a private room
// when they click on another person's profile at search screen.

const mapStateToProps = state => ({
  user: state.user,
  current_room: current_room
});

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    handleChangeScreen: changeScreen
  },
  dispatch
);

class ChatRoom extends Component {
  state = {
    messages: [],
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: this.props.user.uid,
      tokenProvider: tokenProvider,
    });

    chatManager
      .connect() // connect to servers, returns a promise that resolves with a Current User object
      .then(currentUser => {   
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoomMultipart({  
          roomId: this.props.current_room.id,
          hooks: {
            onMessage: this.onReceive,  // on receiving message triggers onReceive
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onReceive = data => {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        },
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    })); // appends received messages to state.messages
  }

  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendSimpleMessage({
          text: message.text,
          roomId: this.props.current_room.id,
        })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat 
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
              _id: this.props.user.uid
            }}
        />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    loader: {
      paddingTop: 20
    },
  
    header_right: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around"
    },
  
    header_button_container: {
      marginRight: 10
    },
    header_button: {
  
    },
    header_button_text: {
      color: '#FFF'
    },
  
    sendLoader: {
      marginRight: 10,
      marginBottom: 10
    },
    customActionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    buttonContainer: {
      padding: 10
    },
    modal: {
      flex: 1,
      backgroundColor: '#FFF'
    },
    close: {
      alignSelf: 'flex-end',
      marginBottom: 10
    },
    modal_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10
    },
    modal_header_text: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    modal_body: {
      marginTop: 20,
      padding: 20
    },
    centered: {
      alignItems: 'center'
    },
    list_item_body: {
      flex: 1,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    list_item: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    list_item_text: {
      marginLeft: 10,
      fontSize: 20,
    },
    status_indicator: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    online: {
      backgroundColor: '#5bb90b'
    },
    offline: {
      backgroundColor: '#606060'
    },
  
    footerContainer: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    footerText: {
      fontSize: 14,
      color: '#aaa',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);