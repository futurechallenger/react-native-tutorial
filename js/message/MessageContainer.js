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
      data:[],
      refreshing: false,
      loading: false,
    };
  }

  requestData = () => {
    const url = 'https://api.github.com/users/futurechallenger/repos';
    fetch(url).then(res => {
      console.log('started fetch');
      return res.json()
    }).then(res => {
      this.setState({
        data: [...this.state.data, ...res], 
        error: res.error || null,
        laoding: false,
        refreshing: false,
      });
    }).catch(err => {
      console.log('==> fetch error', err);
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

  renderItem = (item) => (
    <MessageCell item={item} />
  )

  render() {
    return (
      <View style={styles.container}>
        <Text>Message</Text>
        <FlatList
          data={this.state.data || []}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'stretch', 
    backgroundColor: 'white' 
  }
});