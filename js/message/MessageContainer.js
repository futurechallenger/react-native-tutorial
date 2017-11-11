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

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class MessageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      page: 1,
      refreshing: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () => {
    const url = 'https://www.apple.com';
    fetch(url).then(res => {
      console.log('started fetch');
      return res.json()
    }).then(res => {
      this.setState({
        data: [...this.state.data, ...res.result],
        error: res.error || null,
        laoding: false,
        refreshing: false,
      });
    }).catch(err => {
      this.setState({ error: err, loading: false, refreshing: false});
    });
  };

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      loading: false,
    }, () => {
      this.requestData();
    });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.requestData();
    });
  };

  //TODO: catch error
  componentDidCatch(error, info) {
    // this.setState
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'white' }}>
        <Text>Message</Text>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }]}
          renderItem={({ item }) => (
            <MessageCell />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0} />
      </View>
    );
  }
}
