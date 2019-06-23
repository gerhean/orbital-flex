import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Container, Header, Body, 
    Title, Button, Card, Content, 
    Footer, FooterTab, Right, Left,
    CardItem, Thumbnail } from 'native-base';
import Provider from 'react-redux';
import { createStore } from 'redux';
import Expo from "expo";
import * as Font from 'expo-font';
import firebase from 'firebase';
import reducers from '../../reducers';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  // async componentWillMount() {
  //   await Font.loadAsync({
  //     Roboto: require("../../styles/fonts/Roboto-Black.ttf"),
  //     Roboto_medium: require("../../styles/fonts/Roboto-Medium.ttf")
  //   });
  //   this.setState({ loading: false });
  // } // fix compatibility error between native base and expo

  navigate = (screen) => () => {
    this.props.navigation.navigate(screen);
  };
  
  render() {
    const user = this.props.userInfo;
    
    return (
      <Provider store={ createStore(reducers) }>
        <Container>

          <Header>
            <Left/>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right>
              <Button onPress={this.navigate('Login')}>
                <Text>Log out</Text>
              </Button>
            </Right>
          </Header>

          <Content>
            <Text>{user.username}</Text>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: user.profilePic}} />
                </Left>
                <Body>
                  <Text>{user.about}</Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <Text>Schedules that we booked</Text>
            </Card>
          </Content>

        </Container>
      </Provider>
    );
  }
}

// export default Home;

export default connect(
  mapStateToProps
)(Home);