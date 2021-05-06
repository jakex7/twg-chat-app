import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Profile from '../../assets/images/profile.svg';
import { timeFromNow } from '../../helpers/date';
import CircleButton from '../CircleButton/CircleButton';

const Header = ({ title = '', roomInfo, buttons }) => (
  <View style={styles.container}>
    <View style={styles.flexContainer}>
      {roomInfo ? (
        <>
          {roomInfo.roomPic ? (
            <Image source={{ uri: roomInfo.roomPic }} style={styles.image} />
          ) : (
            <Profile height="44" width="44" style={styles.image} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.roomName} numberOfLines={1}>
              {roomInfo.name}
            </Text>
            <Text style={styles.lastSeen}>
              {roomInfo.lastSeen ? timeFromNow(roomInfo.lastSeen) : null}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.header}>{title}</Text>
      )}
      {buttons && (
        <View style={styles.iconsContainer}>
          {buttons.map((button) => (
            <CircleButton
              key={button.iconName}
              iconName={button.iconName}
              handlePress={button.handlePress}
              style={{ marginLeft: 12 }}
            />
          ))}
        </View>
      )}
    </View>
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
  flexContainer: {
    padding: 16,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    marginRight: 8,
  },
  roomName: {
    color: '#5603AD',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  lastSeen: {
    color: '#ffffff',
  },
  header: {
    color: '#5603AD',
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
  iconsContainer: { flexDirection: 'row' },
});

export default Header;
