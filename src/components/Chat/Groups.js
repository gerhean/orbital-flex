import React, { Component } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { changeScreen, fetchChat, enterRoom } from "../../actions";

const mapStateToProps = state => ({
    user: state.user,
    user_rooms: state.user_rooms
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleFetchRooms: fetchChat,
      handleChangeScreen: changeScreen, // use nav's reducer
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

    // this action is supposed to get rooms 
    // based on user id and 
    renderRoom = ({ item }) => {
        // !? to change button to touchopacity to improve ui
        return (
          <View style={styles.list_item}>
            <Text style={styles.list_item_text}>{item.name}</Text>
            <Button title="Enter" color="#0064e1" onPress={() => {
              this.props.enterRoom(item);
              this.props.navigate("ChatRoom");
            }} />
          </View>
        );
    }
    
    componentDidMount() {
      this.props.handleFetchRooms(this.props.user);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                  keyExtractor={(item) => item.id.toString()}
                  data={this.props.user_rooms}
                  renderItem={this.renderRoom}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list_item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list_item_text: {
    marginLeft: 10,
    fontSize: 20,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);