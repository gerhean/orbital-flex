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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { scheduleCreate, changeScreen } from "../../actions";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleScheduleCreate: scheduleCreate,
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
    const { time, location, services, price, remarks } = this.state;
    this.props.handleScheduleCreate({
      location,
      time,
      price,
      services,
      remarks
    });
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
                value={this.state.time}
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
                value={this.state.location}
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
                value={this.state.services}
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
                value={this.state.price}
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
                value={this.state.remarks}
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
