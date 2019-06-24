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
import { scheduleUpdate, scheduleCreate } from "../../actions";

const mapStateToProps = state => ({
  userInfo: state.userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleSignup: scheduleCreate
    },
    dispatch
  );

const initialState = {
  name: "",
  contact: "",
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
    const { name, contact, time, location, services, price, remarks } = this.props;
    this.props.scheduleCreate({
      name,
      contact,
      time,
      location,
      services,
      price,
      remarks
    });
  };

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Input
                placeholder="Name"
                value={this.props.name}
                onChangeText={text =>
                  this.setState({
                    name: text
                  })
                }
              />
            </CardItem>
            <CardItem>
              <Input
                placeholder="Contact details"
                value={this.props.contact}
                onChangeText={text =>
                  this.setState({
                    contact: text
                  })
                }
              />
            </CardItem>
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
