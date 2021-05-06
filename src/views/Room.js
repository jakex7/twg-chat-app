import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { stringToDate } from '../helpers/date';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import Chat from '../components/Chat/Chat';
import {
  GET_ROOM_AND_MESSAGES,
  MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE_MUTATION,
} from '../helpers/api';
import useMessages from '../hooks/useMessages';
import useRoom from '../hooks/useRoom';
import useSelf from '../hooks/useSelf';

const Room = ({ route, navigation }) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const { id: roomId } = route.params;

  const {
    selfInfo: { id: userId },
  } = useSelf();
  const { room } = useRoom(roomId);
  const {
    allMessages,
    reloadMessages,
    newMessage,
    newMessageLoaded,
    handleSendMessage,
  } = useMessages(roomId);

  // Reload messages when focus
  useEffect(() => {
    return navigation.addListener('focus', () => {
      reloadMessages();
    });
  }, [navigation]);

  // Load room info
  useEffect(() => {
    setRoomInfo(room);
  }, [room]);

  // Load all messages to GiftedChat
  useEffect(() => {
    setMessages(() => GiftedChat.append([], allMessages));
  }, [allMessages]);

  // Add new message to GiftedChat
  useEffect(() => {
    if (newMessageLoaded && Object.keys(newMessage).length !== 0) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
    }
  }, [newMessageLoaded, newMessage]);

  return (
    <ScreenContainer
      roomInfo={{
        ...roomInfo,
        lastSeen: messages.length
          ? messages
              .filter((message) => message.user['_id'] !== userId)
              .slice(0)[0].insertedAt
          : null,
      }}
      buttons={[
        { iconName: 'phone', handlePress: () => {} },
        { iconName: 'videocall', handlePress: () => {} },
      ]}
    >
      <Chat
        messages={messages}
        userId={userId}
        handleSendMessage={(message) => handleSendMessage(message[0].text)}
      />
    </ScreenContainer>
  );
};
export default Room;
