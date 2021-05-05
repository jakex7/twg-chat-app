import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Profile from '../../assets/images/profile.svg';

const Header = ({ title = '', roomInfo }) => (
  <View style={styles.container}>
    <View
      style={{
        padding: 16,
        flexDirection: 'row',
        height: '100%',
        alignItems: 'flex-end',
      }}
    >
      {roomInfo ? (
        <>
          {/*<Image source={{ uri: roomInfo.roomPic }} />*/}
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
          <View>
            <Text
              style={{
                color: '#5603AD',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
              }}
            >
              {roomInfo.name}
            </Text>
            <Text style={{ color: '#ffffff' }}>Active now</Text>
          </View>
        </>
      ) : (
        <Text style={styles.header}>{title}</Text>
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
    // padding: 16,
  },
});

export default Header;
