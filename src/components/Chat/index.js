import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from 'react-native';
import { Container, Content, List, View, Text, Icon } from 'native-base';
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
          { (this.props.chatroomArr.length === 0) 
            ? <View style={{ alignItems: "center", justifyContent: "center"}}>
                <View style={{marginTop: 140}}>
                  <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center"}}>You have no chats at the moment</Text>
                </View>
                <View style={{marginTop: 50, marginBottom: 30}}>
                  <Text style={{fontSize: 18, textAlign: "center"}}>Browse profiles under search to start a conversation!</Text>
                </View>
                <Icon name='chatboxes' style={{fontSize: 90, color: '#00bfff'}} />
              </View>
            : <List>
                <FlatList
                data={this.props.chatroomArr} // data is array
                renderItem={({item}) => <ChatRow roomId={item}/>}
                keyExtractor={item => item}
                />
            </List>
            }
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);