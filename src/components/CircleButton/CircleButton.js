import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Profile from '../../assets/images/profile.svg';
import Search from '../../assets/images/search.svg';
import Rooms from '../../assets/images/rooms.svg';
import Phone from '../../assets/images/phone.svg';
import VideoCall from '../../assets/images/videocall.svg';
import variables from '../../assets/variables';

const CircleButton = ({ iconName = '', handlePress = () => {}, ...rest }) => {
  const props = {
    height: '44',
    width: '44',
    style: {
      borderRadius: 44 / 2,
    },
  };
  return (
    <View {...rest}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.iconContainer}>
            {!iconName && <View style={{ width: 24, height: 24 }} />}
            {iconName === 'profile' && <Profile {...props} />}
            {iconName === 'search' && <Search {...props} />}
            {iconName === 'rooms' && <Rooms {...props} />}
            {iconName === 'phone' && <Phone {...props} />}
            {iconName === 'videocall' && <VideoCall {...props} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: variables.colors.white,
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircleButton;
