import React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  Platform,
} from 'react-native';

const BorderRadiusText = (props) => (
  <View style={props.backgroundStyle}>
    <Text style={props.textStyle}>{props.text}</Text>
  </View>
);

const DrawerHeader = (props) => (
  <View style={styles.header}>
    <Image
      source={require('./img/github_avartar.jpg')}
      style={styles.headerImage} />
    <View style={{ flexGrow: 1, justifyContent: 'space-between', height: 80 }}>
      <Text style={{ top: 10, fontSize: 21, }}>{'180****1234'}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <BorderRadiusText
          backgroundStyle={[styles.borderRadiusText, { backgroundColor: 'red' }]}
          textStyle={{ color: 'white' }}
          text={'会员'} />
        <BorderRadiusText
          backgroundStyle={[styles.borderRadiusText, { backgroundColor: 'grey', marginLeft: 10, }]}
          textStyle={{ color: 'white' }}
          text={`信用积分 ${props.credit ? props.credit : 0}`} />
      </View>
    </View>
  </View>
);

const AchievementScore = (props) => (
  <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-start', }}>
    <Text style={{ marginBottom: 10 }}>873</Text>
    <Text>XX币</Text>
  </View>
);

const Achievement = (props) => (
  <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }, { backgroundColor: 'orange', borderBottomColor: 'red', borderBottomWidth: StyleSheet.hairlineWidth, }]}>
    <Text style={{ marginVertical: 10 }}>{'骑行成就'}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8, }}>
      <AchievementScore />
      <AchievementScore />
      <AchievementScore />
    </View>
    <BorderRadiusText
      backgroundStyle={[styles.borderRadiusText, { backgroundColor: 'white', marginVertical: 8, }]}
      textStyle={{ color: 'grey' }}
      text={'成就换礼物 >'} />
  </View>
)

//TODO: remove this test later
const data = [
  {
    id: 'MyWallet',
    iconPath: './img/ic_drawer_money.png',
    title: '我的钱包',
    subTitle: '299元',
  }, {
    id: 'MyVoucher',
    iconPath: './img/ic_drawer_coupon.png',
    title: '我的卡券',
  }
];

const FlatListItem = (props) => (
  <TouchableOpacity 
    style={styles.listItem}
    onPress={() => props.navigator.navigate(props.info.id)}>
    {/* <Image 
      style={{width: 40, height: 40, backgroundColor: 'red'}} /> */}
    <Text style={{backgroundColor: 'red', flex: 1, textAlign: 'left', textAlignVertical: 'center', marginTop: 10, marginBottom: 10}}>
      {props.info.title}
    </Text>
    {
      props.info.subTitle ? 
        <Text 
          style={{flex: 1, alignItems: 'center', backgroundColor: 'blue', color: 'white', textAlign: 'right', paddingRight: 20}}>
          {props.infosubTitle}
        </Text> : null
    }
  </TouchableOpacity>
);

export default class UserDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderFlatListItem = (item) => {
    console.log('render item', item);
    let { iconPath, title, subTitle } = item;
    return (
      <TouchableOpacity style={{ backgroundColor: 'yellow', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
        {/* <Image 
          style={{width: 40, height: 40, backgroundColor: 'red'}} /> */}
        <Text style={{backgroundColor: 'red', flex: 1, textAlign: 'left', textAlignVertical: 'center', marginTop: 10, marginBottom: 10}}>{title}</Text>
        {/* {
          subTitle ? 
            <Text 
              style={{flex: 1, alignItems: 'center', backgroundColor: 'blue', color: 'white', textAlign: 'right', paddingRight: 20}}>
              {subTitle}
              </Text> : null
        } */}
      </TouchableOpacity>
    );
  }

  render() {
    console.log('==> Pixel Ratio', PixelRatio.get());
    return (
      <View style={styles.container}>
        <ScrollView>
          <DrawerHeader />
          <Achievement />
          {/* <FlatListItem info={} onPress={() => console.log('item is clicked')}/>
          <FlatListItem info={} onPress={() => console.log('item is clicked')}/> */}
          {
            ((items) => {
              if(!items) {
                console.log('Drawer items are invalid', items);
                return null;
              }
              
              return items.map((it, index) => <FlatListItem key={index} info={it} navigator={this.props.items.navigation} />);
              console.log('items are', items);
            })(data)
          }
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'green',
    marginTop: Platform.OS === 'ios' ? (PixelRatio.get() === 3 ? 35 : 20) : 0,
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 30,
  },
  borderRadiusText: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  listItem: {
    backgroundColor: 'yellow', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center',
 },
});
