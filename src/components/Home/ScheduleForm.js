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
import { changeScreen } from "../../actions";

const mapStateToProps = state => ({
  user: state.user,
  schedules: state.schedules
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
  image: "",
  day: 1,
  timeStart: 0,
  timeEnd: 0,
  district: "",
  location: "",
  category: "",
  services: "",
  price: 0,
  remarks: "",
};

class ScheduleForm extends Component {
  static propTypes = {
    editFormId: PropTypes.string,
    // Is schedule for editing vs for create?
    handleSubmitSchedule: PropTypes.func.isRequired,
    // Function to pass edited schedule into
  }

  constructor(props) {
    super(props);
    let schedule = initialSchedule;
    let scheduleId = '';
    if (this.props.editFormId) {
      scheduleId = this.props.editFormId;
      schedule = this.props.schedules[scheduleId];
    } 
    this.state = {
      ...schedule,
      scheduleId,
      price: schedule.price.toString(),
      timePickerVisible: ""
    };
  };

  submitForm = () => {
    const { name, day, timeStart, timeEnd, district, 
      location, category, services, remarks} = this.state;
    let { price, image } = this.state;
    if (!name || !location) {
      Toast.show({ text: "Missing fields" })
      return;
    }
    price = parseFloat(price);
    if (price === NaN) {
      Toast.show({ text: "Price is not a number" })
      return;
    }
    if (!image) {
      image = this.props.user.profilePic;
    }
    const schedule = {
      name,
      image,
      day,
      timeStart,
      timeEnd,
      district,
      location,
      category,
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
      [key]: value
    })
  };

  changeTimePickerState = (visible) => () => {
    this.setState({
      timePickerVisible: visible
    })
  };

  handleTimePicked = date => {
    const time = date.getHours() * 60 + date.getMinutes();
    this.setState({
      [this.state.timePickerVisible]: time,
      timePickerVisible: '',
    })
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
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name of Schedule*</Label>
              <Input
                value={this.state.name}
                onChangeText={this.setValue("name")}
              />
            </Item>

            <Item stackedLabel>
              <Label>Image URL (current profile picture used if blank)</Label>
              <Input
                value={this.state.image}
                onChangeText={this.setValue("image")}
              />
            </Item>

            <Item picker fixedLabel>
              <Label>Day of the week</Label>
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

            <Item fixedLabel>
              <Label>Time</Label>
              <Button rounded bordered onPress={this.changeTimePickerState("timeStart")}>
                <Text>{timeToString(this.state.timeStart)}</Text>
              </Button>
              <Text> to </Text>
              <Button rounded bordered onPress={this.changeTimePickerState("timeEnd")}>
                <Text>{timeToString(this.state.timeEnd)}</Text>
              </Button>

              <DateTimePicker
                isVisible={this.state.timePickerVisible !== ""}
                onConfirm={this.handleTimePicked}
                onCancel={this.changeTimePickerState("")}
                mode="time"
              />
            </Item>

            <Item picker fixedLabel>
              <Label>District</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="General location"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.district}
                onValueChange={this.setValue("district")}
              >
                <Picker.Item label="City" value={1} />
                <Picker.Item label="Central" value={2} />
                <Picker.Item label="North" value={3} />
                <Picker.Item label="South" value={4} />
                <Picker.Item label="East" value={5} />
                <Picker.Item label="West" value={6} />
              </Picker>
            </Item>

            <Item stackedLabel>
              <Label>Location*</Label>
              <Input
                value={this.state.location}
                onChangeText={this.setValue("location")}
              />
            </Item>

            <Item picker fixedLabel>
              <Label>category of workout</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Day of the week"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.category}
                onValueChange={this.setValue("category")}
              >
                <Picker.Item label="Aerobics" value={1} />
                <Picker.Item label="Circuit training" value={2} />
                <Picker.Item label="Cycling" value={3} />
                <Picker.Item label="Hiking" value={4} />
                <Picker.Item label="Swimming" value={5} />
                <Picker.Item label="Weight training" value={6} />
                <Picker.Item label="Strength training" value={7} />
                <Picker.Item label="Calisthenics" value={8} />
                <Picker.Item label="Stretching" value={9} />
                <Picker.Item label="Pilates" value={10} />
                <Picker.Item label="Yoga" value={11} />
                <Picker.Item label="Others" value={12} />
              </Picker>
            </Item>

            <Item stackedLabel>
              <Label>Type of service</Label>
              <Input
                value={this.state.services}
                onChangeText={this.setValue("services")}
              />
            </Item>

            <Item stackedLabel>
              <Label>Price</Label>
              <Input
                value={this.state.price}
                onChangeText={this.setValue("price")}
                keyboardType={'numeric'}
              />
            </Item>

            <Item stackedLabel>
              <Label>Remarks</Label>
              <Input
                value={this.state.remarks}
                onChangeText={this.setValue("remarks")}
              />
            </Item>

          </Form>
          <Button rounded block bordered onPress={this.submitForm}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const timeToString = time => {
  const minute = time%60;
  const hour = (time - minute) / 60
  const frontZero = hour < 10 ? '0' : '';
  const backZero = minute < 10 ? '0' : '';
  return frontZero + hour + ":" + minute + backZero
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleForm);
