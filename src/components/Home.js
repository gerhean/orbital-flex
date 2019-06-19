import React, { Component } from 'react';
//import { FlatList } from 'react-native';
import { Text, Container, Header, Body, 
        Title, Button, Card, Content, 
        Footer, FooterTab, Right } from 'native-base';
import Expo from "expo";
import firebase from 'firebase';


//needs log out button

class Home extends Component {
    state = { loading: true };

    async componentWillMount() {
        await Expo.Font.loadAsync({
          Roboto: require("../styles/fonts/Roboto-Black.ttf"),
          Roboto_medium: require("../styles/fonts/Roboto-Medium.ttf")
        });
        this.setState({ loading: false });
      } // fix compatibility error between native base and expo
    
    render() {
        if (this.state.loading) {
            return <Text>Loading</Text>;
        }
        
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => firebase.auth().signOut()}>
                            <Text>Log out</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Card>
                        <Text>Placeholder for list</Text>
                    </Card>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button>
                            <Text>Home</Text>
                        </Button>       
                        <Button>
                            <Text>Search</Text>
                        </Button>
                        <Button>
                            <Text>Request</Text>
                        </Button>
                        <Button>
                            <Text>Chat</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

export default Home;