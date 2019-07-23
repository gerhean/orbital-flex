import { PropTypes } from 'prop-types';
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Content,
  Right,
  Left,
  Form,
  Item,
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
import LocationInput from './LocationInput';

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
  day: "Monday",
  timeStart: 0,
  timeEnd: 0,
  district: "City",
  location: "",
  category: "Aerobics",
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
    handleChangeScreen: PropTypes.func.isRequired,
    schedules: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isEditForm: PropTypes.bool
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
  }

  submitForm = () => {
    const { name, day, timeStart, timeEnd, district, 
      location, category, services, remarks} = this.state;
    let { price, image } = this.state;
    if (!name || !location) {
      Toast.show({ text: "Missing fields" })
      return;
    }
    price = parseFloat(price);
    if (isNaN(price)) {
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

  handler(arg) {
    this.setState({
      location: arg
    });
    return;
  }

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

        <Content style={styles.content}>
          <Form>
            <Item stackedLabel>
              <Label style={styles.label}>Name of Schedule*</Label>
              <Input
                maxLength={20}
                value={this.state.name}
                onChangeText={this.setValue("name")}
              />
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Image URL (current profile picture used if blank)</Label>
              <Input
                value={this.state.image}
                onChangeText={this.setValue("image")}
              />
            </Item>

            <Item picker fixedLabel>
              <Label style={styles.label}>Day of the week</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.day}
                onValueChange={this.setValue("day")}
              >
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
            </Item>

            <Item fixedLabel>
              <Label style={styles.label}>Time</Label>
              <Button rounded info onPress={this.changeTimePickerState("timeStart")}>
                <Text>{timeToString(this.state.timeStart)}</Text>
              </Button>
              <Text> to </Text>
              <Button rounded info onPress={this.changeTimePickerState("timeEnd")}>
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
              <Label style={styles.label}>District</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.district}
                onValueChange={this.setValue("district")}
              >
                <Picker.Item label="City" value="City" />
                <Picker.Item label="Central" value="Central" />
                <Picker.Item label="North" value="North" />
                <Picker.Item label="South" value="South" />
                <Picker.Item label="East" value="East" />
                <Picker.Item label="West" value="West" />
              </Picker>
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Location*</Label>
              <Input
                placeholder="Enter a location here or search below"
                value={this.state.location}
                onChangeText={this.setValue("location")}
              />
            </Item>

            <Item>
              <LocationInput handler={this.handler.bind(this)} />
            </Item>

            <Item picker fixedLabel>
              <Label style={styles.label}>category of workout</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.category}
                onValueChange={this.setValue("category")}
              >
                <Picker.Item label="Aerobics" value="Aerobics" />
                <Picker.Item label="Swimming" value="Swimming" />
                <Picker.Item label="Weight training" value="Weight training" />
                <Picker.Item label="Calisthenics" value="Calisthenics" />
                <Picker.Item label="Pilates" value="Pilates" />
                <Picker.Item label="Yoga" value="Yoga" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Type of service</Label>
              <Input
                value={this.state.services}
                onChangeText={this.setValue("services")}
              />
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Price</Label>
              <Input
                value={this.state.price}
                maxLength={3}
                onChangeText={this.setValue("price")}
                keyboardType={'numeric'}
              />
            </Item>

            <Item stackedLabel>
              <Label style={styles.label}>Remarks</Label>
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

const styles = StyleSheet.create({ 
  bold: {
    fontWeight: "600"
  },
  content: {
    paddingRight:5
  },
  label: {
    backgroundColor: '#f5f5f5',
    padding: 2
  }
});

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
