import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Header, Body, Text, Right, Left, Button, Title } from 'native-base';
import { changePreviousScreen } from "../../actions";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlePreviousScreen: changePreviousScreen,
    },
    dispatch
  );

class DefaultHeader extends Component {
	static propTypes = {
    title: PropTypes.string.isRequired,
    // Text to be displayed
  };

  constructor(props) {
    super(props);
  }

  render() {

    return (
        <Header>
          <Left />
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <Button onPress={this.props.handlePreviousScreen}>
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
