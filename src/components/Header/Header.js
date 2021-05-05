import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title = '' }) => (
  <View style={styles.container}>
    <Text style={styles.header}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#B6DEFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    color: '#5603AD',
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    padding: 16,
  },
});

export default Header;
