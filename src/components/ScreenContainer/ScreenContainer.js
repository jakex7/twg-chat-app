import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../Header/Header';

const ScreenContainer = ({ children, title, roomInfo, buttons }) => (
  <View style={styles.container}>
    <Header
      title={title}
      roomInfo={roomInfo || null}
      buttons={buttons || null}
    />
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
