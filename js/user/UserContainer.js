import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class UserContainer extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User container</Text>
      </View>
    );
  }
}
