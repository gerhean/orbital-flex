import {
  Thumbnail
} from "native-base";

export default profilePictureDisplay = uri => {
  if (uri) {
    return <Thumbnail source={{ uri: user.profilePic }} />
  } else {
    return <Thumbnail source={require('../../assets/blankProfile.jpg')} />
  }
};
