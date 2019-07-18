import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  Thumbnail,
  View,
  List, 
  ListItem
} from "native-base";
import { FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';

import { changeScreen, fetchUserReviews, addUserReview } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Home/ScheduleList";
import EditOwnReview from "./EditOwnReview";

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserReviews: fetchUserReviews,
      handleAddUserReview: addUserReview,
    },
    dispatch
  );

class ViewReviews extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserReviews(this.props.uid);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  reviewCard = review => (
    <ListItem bordered>
      <Left>
        {profilePictureDisplay(user.profilePic, {large: true})}
      </Left>
      <Body>
        <StarRating
          maxStars={5}
          rating={review.rating}
        />
        <Text>{user.username}</Text>
        <Text>{review.text}</Text>
      </Body>
    </ListItem>
  )

  render() {
    const reviews = this.props.user.reviews;
    if (reviews === undefined) {
      return (
        <Container>
          <Text>Loading</Text>
        </Container>
      );
    }
    const ownReview = this.props.user.ownReview;

    return (
      <Container>
        <Content>
          <EditOwnReview 
            uid={this.props.uid}
            review={ownReview || undefined}
            handleAddUserReview={this.props.handleAddUserReview}
          />
          <List> 
            <FlatList 
              data={reviews} 
              renderItem={({ item }) => reviewCard(item) }
              keyExtractor={item => item.poster}
            />
          </List> 
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviews);