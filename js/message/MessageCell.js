import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class MessageCell extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {name, full_name} = this.props.item.item || {};
    console.log(`===>message cell props, ${name}, ${full_name}`, this.props.item.item)
    return (
      <View style={{ alignItems: 'stretch', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 10, paddingTop: 10, }}>
        <TouchableOpacity
          onPress={() => console.log('item clicked')}
          style={{
            backgroundColor: 'yellow', alignItems: 'stretch', justifyContent: 'center',
            height: 250,
          }}>
          <View style={{
            flex: 1, justifyContent: 'flex-start', alignItems: 'center',
            backgroundColor: 'orange', borderRadius: 10, overflow: 'hidden'
          }}>
            <Image
              source={require('./img/graphql_wx.jpg')}
              style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'red', width: SCREEN_WIDTH - 20, height: 150 }}
              resizeMode={Image.resizeMode.stretch} />
            <View style={{ flex: 1, justifyContent: 'space-around', alignSelf: 'stretch', alignItems: 'flex-start', paddingVertical: 20, marginHorizontal: 20 }}>
              <Text style={{ textAlign: 'left', backgroundColor: 'yellow' }}>{name}</Text>
              <Text style={{ textAlign: 'left', backgroundColor: 'yellow' }}>{full_name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}