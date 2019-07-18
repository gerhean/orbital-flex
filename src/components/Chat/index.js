import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ListView,
  FlatList,
  View,
  Image
  } from 'react-native';
import { Container, Header, Content, List } from 'native-base';
import styles from './styles.js';
import { changeScreen } from "../../actions";
import ChatRow from "./ChatRow";

const mapStateToProps = state => ({
  chatroomArr: state.chat.chatroomArr,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
  {
    handleChangeScreen: changeScreen,
  },
  dispatch
  );

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <FlatList
            data={this.props.chatroomArr} // data is array
            renderItem={({item}) => <ChatRow roomId={item}/>}
            keyExtractor={item => item}
            />
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);