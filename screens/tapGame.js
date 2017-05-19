import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class tapGame extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  render() {
    return (
      <View style={styles.gameContainer}>
        <Text style={styles.titleText}>Stay tuned!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
  }
});
