import React, { Component } from "react";
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
  Thumbnail,
  Input
} from "native-base";
import firebase from "firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { scheduleCreate, changeScreen } from "../../actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleSignup: scheduleCreate,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

const initialState = {
  time: "",
  location: "",
  services: "",
  price: "",
  remarks: ""
};

class ScheduleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  submitForm = () => {
    const { time, location, services, price, remarks } = this.props;
    console.log("schedule format is wrong")
    // this.props.scheduleCreate({
    //   time,
    //   location,
    //   services,
    //   price,
    //   remarks
    // });
  };

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Create Schedule</Title>
          </Body>
          <Right>
            <Button onPress={this.navigate("Home")}>
              <Text>Discard Changes</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Card>
            <CardItem>
              <Input
                placeholder="Time"
                value={this.props.time}
                onChangeText={text =>
                  this.setState({
                    time: text
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Location"
                value={this.props.location}
                onChangeText={text =>
                  this.setState({
                    location: text
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Specialty"
                value={this.props.services}
                onChangeText={text =>
                  this.setState({
                    services: text
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Price"
                value={this.props.price}
                onChangeText={text =>
                  this.setState({
                    price: text
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Remarks"
                value={this.props.remarks}
                onChangeText={text =>
                  this.setState({
                    remarks: text
                  })
                }
              />
            </CardItem>
          </Card>
          <Button onPress={this.submitForm}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm);
