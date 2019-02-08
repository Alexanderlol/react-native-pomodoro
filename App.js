import React from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

import CustomCount from './count.js'

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <CustomCount />
      </View>
    );
  }
}