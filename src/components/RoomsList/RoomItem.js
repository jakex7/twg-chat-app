import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import Profile from '../../assets/images/profile.svg';
import sliceText from '../../helpers/sliceText';

const RoomItem = ({ room }) => {
  const [lastMessage, setLastMessage] = useState([]);
  const { loading, data } = useQuery(gql`
    {
      room(id: "${room.id}") {
        messages {
          id
          body
          insertedAt
        }
      }
    }
  `);
  useEffect(() => {
    if (!loading) {
      setLastMessage(sliceText(data.room.messages.slice(-1)[0].body, 35));
    }
  }, [loading, data]);
  return (
    <View style={styles.container}>
      {room.roomPic ? (
        <Image source={{ uri: room.roomPic }} style={styles.image} />
      ) : (
        <Profile height="64" width="64" style={styles.image} />
      )}
      <View>
        <Text style={styles.title}>{sliceText(room.name, 30)}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
      <Text style={styles.lastMessageTime}>2 h ago</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 6,
    marginBottom: 6,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    borderRadius: 12,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 64 / 2,
    marginRight: 16,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 20,
  },
  lastMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  lastMessageTime: {
    position: 'absolute',
    top: 8,
    right: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#9FA2B2',
  },
});

export default RoomItem;
