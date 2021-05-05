import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../Header/Header';

const ScreenContainer = ({ children, title }) => (
  <View style={styles.container}>
    <Header title={title} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F0F8FF',
  },
});
export default ScreenContainer;