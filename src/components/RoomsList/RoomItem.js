import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { useQuery, gql, useSubscription } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/images/profile.svg';
import sliceText from '../../helpers/sliceText';
import { GET_ROOM_AND_MESSAGES, MESSAGE_SUBSCRIPTION } from '../../helpers/api';
import { timeFromNow } from '../../helpers/date';

const RoomItem = ({ room }) => {
  const [lastMessage, setLastMessage] = useState({
    body: '',
    insertedAt: '',
    fromNow: '',
  });
  const navigation = useNavigation();
  const {
    loading: loadingQuery,
    data: dataQuery,
  } = useQuery(GET_ROOM_AND_MESSAGES, { variables: { roomID: room.id } });
  const {
    data: dataSubscription,
    loading: loadingSubscription,
  } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { roomID: room.id } });

  useEffect(() => {
    const updateLastMessageTime = () => {
      setLastMessage((prevState) => ({
        ...prevState,
        fromNow: timeFromNow(lastMessage.insertedAt),
      }));
    };
    updateLastMessageTime();
    const interval = setInterval(updateLastMessageTime, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lastMessage.insertedAt]);

  useEffect(() => {
    if (!loadingQuery) {
      setLastMessage({
        body: sliceText(dataQuery.room.messages.slice(-1)[0].body, 35),
        insertedAt: dataQuery.room.messages.slice(-1)[0].insertedAt,
      });
    }
  }, [loadingQuery, dataQuery]);

  useEffect(() => {
    if (!loadingSubscription && dataSubscription) {
      const { body, insertedAt } = dataSubscription.messageAdded;
      setLastMessage({ body: sliceText(body, 35), insertedAt });
    }
  }, [dataSubscription, loadingSubscription]);

  const handleOpen = () => {
    navigation.navigate('Room', { id: room.id });
  };
  return (
    <TouchableNativeFeedback onPress={handleOpen}>
      <View style={styles.container}>
        {room.roomPic ? (
          <Image source={{ uri: room.roomPic }} style={styles.image} />
        ) : (
          <Profile height="64" width="64" style={styles.image} />
        )}
        <View>
          <Text style={styles.title}>{sliceText(room.name, 30)}</Text>
          <Text style={styles.lastMessage}>{lastMessage.body}</Text>
        </View>
        <Text style={styles.lastMessageTime}>{lastMessage.fromNow}</Text>
      </View>
    </TouchableNativeFeedback>
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
