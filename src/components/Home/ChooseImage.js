import { PropTypes } from 'prop-types';
import React, { Component } from "react";
import {
  Text,
  Body,
  Button,
  Input,
  Item,
  Label,
  View,
  Icon
} from "native-base";
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import profilePictureDisplay from '../profilePictureDisplay';
import { Constants, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker'

class ChooseImage extends Component {
  static propTypes = {
    urlLabel: PropTypes.string.isRequired,
    localImage: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
    handleChangeLocalImg: PropTypes.func.isRequired,
    handleChangeUrlImg: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      checkUrlImageVisible: false
    };
  }

  setValue = key => value => {
    this.setState({
      [key]: value
    })
  };

  toggleCheckPicture = value => () => {
    this.setState({checkUrlImageVisible: value })
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Toast.show({ text: 'Sorry, we need camera roll permissions to make this work!' });
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
    });
    // console.log(result);
    if (!result.cancelled) {
      this.props.handleChangeLocalImg(result.uri);
    }
  };

  viewImageDialog = () => (
    <Dialog
      visible={this.state.checkUrlImageVisible}
      onTouchOutside={this.toggleCheckPicture(false)}
      dialogTitle={<DialogTitle title="Check Displayed Picture" />}
      footer={
        <View>
          <Button block onPress={this.toggleCheckPicture(false)}>
            <Text>Done</Text>
          </Button>
        </View>
      }
    >
      <DialogContent>
        {profilePictureDisplay(this.props.urlImage, {large: true})}
      </DialogContent>
    </Dialog>
  )

  render() {
    const localImage = this.props.localImage;
    if (localImage) {
      return (
        <Item avatar>
          {profilePictureDisplay(localImage)}
          <Body>
            <Text>Using Local Image</Text>
            <Button style={{margin: 5}} block onPress={this.pickImage}>
              <Text>Choose Another Image</Text>
            </Button>
            <Button 
              style={{margin: 5}}
              block 
              onPress={() => this.props.handleChangeLocalImg('')}
            >
              <Text>Use Image URL</Text>
            </Button>
          </Body>
        </Item>
      )
    } else {
      return (
        <Item stackedLabel>
          <Label>{this.props.urlLabel}</Label>
          <Input
            value={this.props.urlImage}
            onChangeText={this.props.handleChangeUrlImg}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button rounded onPress={this.toggleCheckPicture(true)}>
              <Text style={{marginRight: 5}}>Check Image</Text>
              <Icon name="eye"/>
            </Button>
            <Button rounded onPress={this.pickImage}>
              <Text>Upload Image</Text>
              <Icon name="photos"/>
            </Button>
          </View>
          {this.viewImageDialog()}
        </Item>
      );
    }
  }
}



export default ChooseImage;
