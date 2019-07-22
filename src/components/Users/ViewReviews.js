import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Body,
  Title,
  Button,
  Content,
  Left,
  View,
  List, 
  ListItem,
  H3
} from "native-base";
import { FlatList } from 'react-native';
import StarRating from 'react-native-star-rating';

import { changeScreen, fetchUserReviews, addUserReview } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import EditOwnReview from "./EditOwnReview";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.isOwnReviews) {
    return {
      user: state.user
    }
  } else {
    return {
      user: state.users[ownProps.uid]
    }
  }
};

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
    isOwnReviews: PropTypes.bool,
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
        {profilePictureDisplay(this.props.user.profilePic, {large: true})}
      </Left>
      <Body>
        <H3>{this.props.user.username}</H3>
        <StarRating
          maxStars={5}
          rating={review.rating}
          disabled={true}
          fullStarColor="yellow"
          starSize={20}
        />
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
          {this.props.isOwnReviews ? 
            null :
            <EditOwnReview 
              uid={this.props.uid}
              review={ownReview || undefined}
              handleAddUserReview={this.props.handleAddUserReview}
            />
          }
          <FlatList 
            data={reviews} 
            renderItem={({ item }) => this.reviewCard(item) }
            keyExtractor={item => item.poster}
          /> 
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviews);