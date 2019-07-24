import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Text,
  ListItem,
  Body,
  Button,
  H3,
  View
} from "native-base";
import { changeScreen, fetchUserInfo } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
    },
    dispatch
  );

class OfferCard extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    // uid of booker
    offer: PropTypes.object.isRequired,
    // offer of booker
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.uid);
  }

  render() {
    const user = this.props.user;
    if (!user) {
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading</Text>
      </View>
    }
    const offer = this.props.offer;
    return (
      <ListItem bordered avatar>
        {profilePictureDisplay(user.profilePic, {large: true})}
        <Body style={{ "paddingLeft": 10 }}>
          <View style={{fontStyle:"italic", backgroundColor: "#dcdcdc", marginBottom: 5}}>
            <H3>{user.username}</H3>
          </View>
          <View style={{marginBottom: 5}}>
            <Text note>Offer price:</Text>
            <Text>${offer.price.toString()}</Text>
            <Text note>Remarks:</Text>
            <Text>{offer.remarks}</Text>
          </View>
          <Button block rounded onPress={this.navigate("UserProfile/" + this.props.uid)}>
            <Text>View Profile</Text>
          </Button>
        </Body>
      </ListItem>
    );
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);