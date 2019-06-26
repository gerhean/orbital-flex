import React, { Component } from "react";
import {
  Thumbnail
} from "native-base";

export default profilePictureDisplay = uri => {
  if (uri) {
    return <Thumbnail source={{ uri }} />
  } else {
    return <Thumbnail source={require('../../assets/blankProfile.jpg')} />
  }
};
