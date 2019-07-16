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
  chatroomArr: state.chat.chatroomArr,
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
      onPress={() => {
        this.props.navigate("Chatroom/" + item);
      }}
      >
      <Text style={styles.roomLiText}>{item.name}</Text>
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
          renderItem={({item}) => (this.renderRow(item)
          )}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);