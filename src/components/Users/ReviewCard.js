import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  Body,
  ListItem,
  H3
} from "native-base";
import StarRating from 'react-native-star-rating';

import { changeScreen, fetchUserInfo } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.review.poster],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
    },
    dispatch
  );

class ReviewCard extends Component {
  static propTypes = {
    review: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
      }).isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.review.poster);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const user = this.props.user;
    if (!user) return null;
    const review = this.props.review;
    return (
      <ListItem bordered>
        {profilePictureDisplay(user.profilePic, {large: true})}
        <Body style={{ "margin": 5 }}>
          <H3>{user.username}</H3>
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
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);