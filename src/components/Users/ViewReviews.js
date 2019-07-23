import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Content,
} from "native-base";
import { FlatList } from 'react-native';

import { changeScreen, fetchUserReviews, addUserReview } from "../../actions";
import EditOwnReview from "./EditOwnReview";
import ReviewCard from './ReviewCard';

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
            renderItem={({ item }) => <ReviewCard review={item}/> }
            keyExtractor={item => item.poster}
          /> 
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviews);