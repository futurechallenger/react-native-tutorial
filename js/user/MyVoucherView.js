import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class MyVoucherView extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => this.props.navigation.goBack()}>
        <Text>{'My Voucher'}</Text>
      </TouchableOpacity>
    );
  }
}
