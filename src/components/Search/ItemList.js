/*
import React, { Component } from "react";
import { View, TextInput, StyleSheet, FlatList, Image } from "react-native";
import PropTypes from "prop-types";
import { InstantSearch } from "react-instantsearch-native";
import {
  connectSearchBox,
  connectInfiniteHits
} from "react-instantsearch/connectors";
import { Constants } from "expo";
import ListItem from "./ListItem";
import layout from "./layout";
import { Algolia_APP_ID, Algolia_API_Key, ALGOLIA_INDEX_NAME} from '../../../env';

// consists of searchbox and a list of hits

export default class ItemList extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <InstantSearch
           appId={ Algolia_APP_ID }
           apiKey={ Algolia_API_Key }
           indexName={ ALGOLIA_INDEX_NAME }
        >
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../assets/algolia.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <ConnectedSearchBar />
          </View>
          <ConnectedHits />
        </InstantSearch>
      </View>
    );
  }
}

class SearchBar extends Component {
  // _textInput: TextInput;

  // state = {
  //  isFocused: false,
  // };

  render() {
      const { isFocused } = this.state;
  return (
        <TextInput
          returnKeyType="done"
          clearButtonMode="while-editing"
          // onFocus={this._onFocus}
          // onBlur={this._onBlur}
          style={styles.textInput}
          onChangeText={text => this.props.refine(text)}
          value={this.props.currentRefinement}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoFocus
        />
      );
    }
  /*
    focus() {
      this._textInput && this._textInput.focus();
    }
  blur() {
      this._textInput && this._textInput.blur();
    }
  _onFocus = () => {
      this.setState({ isFocused: true });
      this.props.onFocus && this.props.onFocus();
    };
  _onBlur = () => {
      this.setState({ isFocused: false });
      this.props.onBlur && this.props.onBlur();
    };
    * /
}

SearchBar.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string
};

const ConnectedSearchBar = connectSearchBox(SearchBar);

// not too sure if hit works automatically according to an existing index

class Hits extends Component {
  render() {
    const hits =
      this.props.hits.length > 0 ? (
        <FlatList
          data={this.props.hits}
          renderItem={this.renderItem}
          keyExtractor={item => item.objectID}
          initialNumToRender={5}
        />
      ) : null;
    return hits;
  }
renderItem({ item }) {
    return <ListItem item={item} />;
  }
}

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired
};

const ConnectedHits = connectInfiniteHits(Hits);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight
  },
  searchContainer: {
    width: layout.window.width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgb(200, 199, 204)",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    height: 20,
    width: 20
  },
  textInput: {
    height: 30,
    fontSize: 24,
    width: layout.window.width - 20
  }
});
*/