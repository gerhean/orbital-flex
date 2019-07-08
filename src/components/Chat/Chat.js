import React, { PureComponent, Component } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelPreviewMessenger,
  ChannelList,
} from 'stream-chat-expo';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import firebase from 'firebase';
import chatClient from '../../sagas/backendSaga';

const uid = firebase.auth().currentUser.uid;

class ChannelListScreen extends PureComponent {
  static navigationOptions = () => ({
    headerTitle: (
      <Text style={{ fontWeight: 'bold' }}>Chat</Text>
    ),
  });

  render() {
    return (
      <SafeAreaView>
        <Chat client={chatClient}>
          <View style={{ display: 'flex', height: '100%', padding: 10 }}>
            <ChannelList
              filters={{ type: 'messaging', members: { $in: [uid] } }}  
              sort={{ last_message_at: -1 }}
              Preview={ChannelPreviewMessenger}
              onSelect={(channel) => {
                this.props.navigation.navigate('Channel', {
                  channel,
                }); // passes channel as param
              }}
            />
          </View>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ChannelScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const channel = navigation.getParam('channel');
    return {
      headerTitle: (
        <Text style={{ fontWeight: 'bold' }}>{channel.data.name}</Text>
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    const channel = navigation.getParam('channel');

    return (
      <SafeAreaView>
        <Chat client={chatClient}>
          <Channel client={chatClient} channel={channel}>
            <View style={{ display: 'flex', height: '100%' }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    ChannelList: {
      screen: ChannelListScreen,
    },
    Channel: {
      screen: ChannelScreen,
    },
  },
  {
    initialRouteName: 'ChannelList',
  },
);

export const chatContainer = createAppContainer(RootStack);

/* listening for messages
channel.on('message.new', event => {
  console.log('received a new message', event.message.text);
  console.log(`Now have ${channel.state.messages.length} stored in local state`);
});
*/

