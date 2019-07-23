import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  StatusBar,
} from 'react-native';
import { Container, Header, Left, Body, Right, Text, Title, Button } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { createChat, changeScreen, fetchUserInfo } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
  uid: state.user.uid,
  user: state.users[ownProps.otherUid],
});

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    handleChangeScreen: changeScreen,
    handleCreateChat: createChat,
    handleFetchUserInfo: fetchUserInfo,
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

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.otherUid);
  }
    
  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
  
  sendMessage = (messages = []) => {
    this.props.handleCreateChat(messages[0].text, this.props.otherUid)
  }

  render() {
    if (!this.props.user) return null;
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

        <StatusBar barStyle="light-content"/>
        <GiftedChat
          messages={[]}  // array of messages to display
          onSend={this.sendMessage}
          user={{
            _id: this.props.uid,
          }}
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomNew);