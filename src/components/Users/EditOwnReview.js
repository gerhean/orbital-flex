import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Form,
  Body,
  Button,
  Content,
  Right,
  Left,
  Item,
  View,
  Input
} from "native-base";
import { FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';

import { changeScreen, fetchUserReviews } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Home/ScheduleList";

class EditOwnReview extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    review: PropTypes.object,
    handleAddUserReview: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const review = this.props.review || {};
    this.state = {
      text: review.text || '',
      rating: review.rating || 0,
    };
  }

  setValue = key => value => {
    this.setState({
      [key]: value
    })
  };

  onStarRatingPress = rating => {
    this.setState({
      rating
    });
  };

  submitForm = () => {
    const {text, rating} = this.state;
    this.props.handleAddUserReview(this.props.uid, text, rating)
  };

  render() {
    const reviews = this.props.review;

    return (
      <Container>
        <Form>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.rating}
            selectedStar={this.onStarRatingPress}
          />
          <Item stackedLabel>
            <Label>Review</Label>
            <Input
              value={this.state.text}
              onChangeText={this.setValue("text")}
            />
          </Item>
        </Form>

        <Button rounded block bordered onPress={this.submitForm}>
          <Text>Submit</Text>
        </Button>
      </Container>
    );
  }
}

export default EditOwnReview;