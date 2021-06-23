/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';


const width = Dimensions.get('screen').width

const PaginationDot = ({ backgroundColor }) => {
  return (
    <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: backgroundColor }} />
  )
}

class App extends Component {
  state = {
    item: 1
  }

  renderView = (item) => {
    return (
      <View style={{ width: width, backgroundColor: item.item === 1 ? 'pink' : item.item === 2 ? '#ccc' : 'green', alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <Text>Screen {item.item}</Text>
      </View>
    )
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({ ...this.state, item: changed[0].item })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 200 }}>
          <FlatList
            style={{ backgroundColor: 'red', flex: 1 }}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}

            data={[1, 2, 3]}
            renderItem={(item, index) => this.renderView(item, index)}
            keyExtractor={data => data.toString()}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50
            }}
          />
        </View>
        <View style={{ width: '20%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
          {
            [1, 2, 3].map((item) => {
              return (
                <PaginationDot backgroundColor={item === this.state.item ? 'red' : '#ccc'} />
              )
            })
          }
        </View>

      </SafeAreaView>
    );
  }
};

export default App;
