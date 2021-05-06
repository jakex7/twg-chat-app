import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Profile from '../../assets/images/profile.svg';
import { timeFromNow } from '../../helpers/date';
import CircleButton from '../CircleButton/CircleButton';

const Header = ({ title = '', roomInfo, buttons }) => (
  <View style={styles.container}>
    <View
      style={{
        padding: 16,
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {roomInfo ? (
        <>
          {roomInfo.roomPic ? (
            <Image
              source={{ uri: roomInfo.roomPic }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 44 / 2,
                marginRight: 8,
              }}
            />
          ) : (
            <Profile
              height="44"
              width="44"
              style={{
                borderRadius: 44 / 2,
                marginRight: 8,
              }}
            />
          )}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#5603AD',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                // flex: 1,
                // width: '',
              }}
              numberOfLines={1}
            >
              {roomInfo.name}
            </Text>
            <Text style={{ color: '#ffffff' }}>
              {roomInfo.lastSeen ? timeFromNow(roomInfo.lastSeen) : null}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.header}>{title}</Text>
      )}
      {buttons && (
        <View style={{ flexDirection: 'row' }}>
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
  header: {
    color: '#5603AD',
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
});

export default Header;
