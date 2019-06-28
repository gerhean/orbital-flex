import React, { Component } from "react";
import {
  Thumbnail
} from "native-base";

export default profilePictureDisplay = (uri, options = {}) => {
  if (uri) {
    return <Thumbnail {...options} source={{ uri }} />
  } else {
    return <Thumbnail {...options} source={require('../../assets/blankProfile.jpg')} />
  }
};
