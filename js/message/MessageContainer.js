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

export default class MessageContainer extends React.Component {
  //TODO: catch error
  componentDidCatch(error, info) {
    // this.setState
  }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
        <Text>Message</Text>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => (
            <View style={{alignItems: 'stretch', justifyContent: 'center', backgroundColor:'white', paddingHorizontal: 10, paddingTop:10,}}> 
              <TouchableOpacity 
                onPress={() => console.log('item clicked')}
                style={{backgroundColor: 'yellow', alignItems: 'stretch', justifyContent: 'center',
                height: 250, }}>
                <View style={{flex:1, justifyContent: 'flex-start', alignItems:'center', 
                  backgroundColor: 'orange',borderRadius: 10, overflow: 'hidden'}}>
                  <Image 
                    source={require('./img/graphql_wx.jpg')} 
                    style={{borderRadius:10, backgroundColor: 'red',width:SCREEN_WIDTH - 20,height:250}} 
                    resizeMode={Image.resizeMode.stretch}/>
                  <Text style={{backgroundColor: 'green', color:'white'}}>{item.key}</Text>   
                </View>
              </TouchableOpacity>
            </View>)} />
      </View>
    );
  }
}
