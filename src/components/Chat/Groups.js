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
import { fetchRooms, enterRoom, changeScreen } from "../../actions";

const mapStateToProps = state => ({
    user: state.user,
    user_rooms: state.user_rooms
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleFetchRooms: fetchRooms,
      handleChangeScreen: changeScreen,
      handleEnterRoom: enterRoom
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

    componentDidMount() {
        this.props.handleFetchRooms(this.props.user);
        }

    renderRow(item) {
        return (
            <TouchableHighlight style={styles.roomLi}
            underlayColor="#fff"
            onPress={() => {
                this.props.handleEnterRoom(item);
                this.props.navigate("ChatRoom");
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
                    data={this.props.user_rooms} // data is array
                    renderItem={({item}) => (this.renderRow(item)
                    )}
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);