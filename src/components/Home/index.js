import React, { Component } from 'react';
//import { FlatList } from 'react-native';
import { Text, Container, Header, Body, 
        Title, Button, Card, Content, 
        Footer, FooterTab, Right, Left } from 'native-base';
import Expo from "expo";
import * as Font from 'expo-font';
import firebase from 'firebase';


//needs log out button

class Home extends Component {
    state = { loading: true };

    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("../../styles/fonts/Roboto-Black.ttf"),
          Roboto_medium: require("../../styles/fonts/Roboto-Medium.ttf")
        });
        this.setState({ loading: false });
      } // fix compatibility error between native base and expo

    navigate = (screen) => () => {
        this.props.navigation.navigate(screen);
    };
    
    render() {
        if (this.state.loading) {
            return <Text>Loading</Text>;
        }
        
        return (
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
                    <Card>
                        <Text>Placeholder for list</Text>
                    </Card>
                </Content>

            </Container>
        );
    }
}

export default Home;