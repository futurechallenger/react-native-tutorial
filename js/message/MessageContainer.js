import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import MessageCell from './MessageCell';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class MessageContainer extends React.Component {
  //TODO: catch error
  componentDidCatch(error, info) {
    // this.setState
  }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch',backgroundColor: 'white' }}>
        <Text>Message</Text>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }]}
          renderItem={({ item }) => (
            <MessageCell />   
          )} />
      </View>
    );
  }
}
