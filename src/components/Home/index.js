import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Card,
  Content,
  Footer,
  FooterTab,
  Right,
  Left,
  CardItem,
  Thumbnail
} from "native-base";
import { changeScreen, logout } from "../../actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleLogout: logout,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

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

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const user = this.props.user;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button onPress={() => this.props.handleLogout()}>
              <Text>Log out</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: user.profilePic }} />
              </Left>
              <Body>
                <Text>{user.username}</Text>
                <Text>{user.about}</Text>
                <Text>EDIT INFO BUTTON HERE</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <Text>Booked Schedules</Text>
          </Card>
          <Card>
            <Text>Posted Schedules</Text>
          </Card>
          <Card>
            <Button onPress={this.navigate("ScheduleForm")}>
              <Text>Create Schedule</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
