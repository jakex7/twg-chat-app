import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Profile from '../../assets/images/profile.svg';
import { timeFromNow } from '../../helpers/date';
import useMessages from '../../hooks/useMessages';
import { GiftedChat } from 'react-native-gifted-chat';

const RoomItem = ({ room }) => {
  const [lastMessage, setLastMessage] = useState({
    body: '',
    insertedAt: '',
    fromNow: '',
  });
  const navigation = useNavigation();
  const {
    allMessages,
    reloadMessages,
    newMessage,
    newMessageLoaded,
  } = useMessages(room.id);

  // Reload last message when focused
  useEffect(() => {
    return navigation.addListener('focus', () => {
      reloadMessages();
    });
  }, [navigation]);

  // Load last message
  useEffect(() => {
    if (allMessages.length) {
      setLastMessage({
        body: allMessages[0].body,
        insertedAt: allMessages[0].insertedAt,
        fromNow: timeFromNow(allMessages[0].insertedAt),
      });
    }
  }, [allMessages]);
  // Update last message if new message received
  useEffect(() => {
    if (newMessageLoaded && Object.keys(newMessage).length !== 0) {
      setLastMessage({
        body: newMessage.text,
        insertedAt: newMessage.createdAt,
        fromNow: timeFromNow(newMessage.createdAt),
      });
    }
  }, [newMessageLoaded, newMessage]);
  // Update time from now in last message every 10 seconds
  useEffect(() => {
    const updateLastMessageTime = () => {
      setLastMessage((prevState) => ({
        ...prevState,
        fromNow: timeFromNow(prevState.insertedAt),
      }));
    };
    updateLastMessageTime();
    const interval = setInterval(updateLastMessageTime, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lastMessage.insertedAt]);

  // Open room with id param
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
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {room.name}
          </Text>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage.body}
          </Text>
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
    width: '80%',
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
