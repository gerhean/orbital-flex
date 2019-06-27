import { PropTypes } from 'prop-types';
import React, { Component } from "react";
import {
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Footer,
  FooterTab,
  Right,
  Left,
  Form,
  Item,
  Thumbnail,
  Label,
  Input,
  Picker,
  Icon,
  Toast
} from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import { scheduleCreate, changeScreen } from "../../actions";

const mapStateToProps = state => ({
  user: state.user,
  scheduleIndex: state.editScheduleIndex,
  postedSchedules: state.postedSchedules,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

const initialSchedule = {
  name: "",
  day: 0,
  timeStart: 0,
  timeEnd: 0,
  location: "",
  services: "",
  price: "",
  remarks: "",
};

class ScheduleForm extends Component {
  static propTypes = {
    isEditForm: PropTypes.bool,
    // Is schedule for editing?
    handleSubmitSchedule: PropTypes.func.isRequired,
    // Function to pass edited schedule into
  }

  constructor(props) {
    super(props);
    let schedule = initialSchedule;
    if (this.props.isEditForm) {
      schedule = this.props.postedSchedules[this.props.scheduleIndex];
    } 
    this.state = {
      ...schedule,
      timePickerVisible: ""
    };
  }

  submitForm = () => {
    const { name, day, timeStart, timeEnd, location, services, price, remarks} = this.state
    if (!name || day === 0 || !location) {
      Toast.show({ text: "missing fields" })
    }
    const schedule = {
      name,
      day,
      timeStart,
      timeEnd,
      location,
      services,
      price,
      remarks
    }
    if (this.props.isEditForm) {
      schedule["scheduleId"] = this.state.scheduleId;
    }
    
    this.props.handleSubmitSchedule(schedule);
  };

  setValue = key => value => {
    this.setState({
      [key]: text
    })
  };

  changeTimePickerState = (visible) => () => {
    this.setState({
      timePickerVisible: visible
    })
  }

  handleTimePicked = date => {
    const time = date.getHours() * 60 + date.getMinutes();
    console.log(time);
    this.setState({
      [this.state.timePickerVisible]: time
    })
  }

  timeToString = (time) => {
    const minute = time%60;
    const hour = (time - minute) / 60
    return "" + hour + ":" + minute 
  }

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
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Name of Schedule</Label>
              <Input
                value={this.state.name}
                onChangeText={this.setValue("name")}
              />
            </Item>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Day of the week"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.day}
                onValueChange={this.setValue("day")}
              >
                <Picker.Item label="Monday" value={1} />
                <Picker.Item label="Tuesday" value={2} />
                <Picker.Item label="Wednesday" value={3} />
                <Picker.Item label="Thursday" value={4} />
                <Picker.Item label="Friday" value={5} />
                <Picker.Item label="Saturday" value={6} />
                <Picker.Item label="Sunday" value={7} />
              </Picker>
            </Item>

            <Item>
              <Text>Time</Text>
              <Button onPress={this.changeTimePickerState("timeStart")}>
                <Text>{timeToString(this.state.timeStart)}</Text>
              </Button>
              <Text> to </Text>
              <Button onPress={this.changeTimePickerState("timeEnd")}>
                <Text>{timeToString(this.state.timeEnd)}</Text>
              </Button>

              <DateTimePicker
                isVisible={this.state.timePickerVisible}
                onConfirm={this.handleTimePicked}
                onCancel={this.changeTimePickerState("")}
                mode="time"
              />
            </Item>

            <Item floatingLabel>
              <Input
                placeholder="Location"
                value={this.state.location}
                onChangeText={this.setValue("location")}
              />
            </Item>

            <Item>
              <Input
                placeholder="Type"
                value={this.state.services}
                onChangeText={this.setValue("services")}
              />
            </Item>

            <Item>
              <Input
                placeholder="Price"
                value={this.state.price}
                onChangeText={this.setValue("price")}
                keyboardType={'numeric'}
              />
            </Item>

            <Item>
              <Input
                placeholder="Remarks"
                value={this.state.remarks}
                onChangeText={this.setValue("remarks")}
              />
            </Item>

          </Form>
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
