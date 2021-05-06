import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../Header/Header';
import variables from '../../assets/variables';

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
    backgroundColor: variables.colors.blue.tint2,
  },
});
export default ScreenContainer;
