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
  View
  } from 'react-native';
import styles from './styles.js';
import { changeScreen } from "../../actions";

const mapStateToProps = state => ({
  user: state.user,
  users: state.users,
  chatroomArr: state.chat.chatroomArr,
  chatrooms: state.chat.chatrooms,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
  {
    handleChangeScreen: changeScreen,
  },
  dispatch
  );

class Groups extends Component {
  constructor(props) {
    super(props);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  renderRow(item) {
    return (
      <TouchableHighlight style={styles.roomLi}
      underlayColor="#fff"
      onPress={this.navigate("Chatroom/" + item)}>
      <Text style={styles.roomLiText}>{item}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.roomsContainer}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.roomsHeader}>Chats</Text>
        <View style={styles.roomsListContainer}>
          <FlatList
          data={this.props.chatroomArr} // data is array
          renderItem={({item}) => (this.renderRow(item))}
          keyExtractor={item => item}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);