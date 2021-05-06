import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import variables from '../../assets/variables';

const RenderFooter = ({ e, typingUser }) => {
  return e.isTyping ? (
    <View style={styles.container}>
      <Image
        source={{ uri: typingUser.profilePic }}
        width={24}
        height={24}
        style={styles.image}
      />
      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  image: { width: 24, height: 24, borderRadius: 24 / 2 },
  dotsContainer: {
    marginLeft: 12,
    backgroundColor: variables.colors.white,
    width: 68,
    height: 32,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: variables.colors.blue.tint,
    borderRadius: 8 / 2,
    margin: 4,
  },
});
export default RenderFooter;
