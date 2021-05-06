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

const Room = ({ route, navigation }) => {
  const [userId, setUserId] = useState('');
  const [roomInfo, setRoomInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const { id: roomId } = route.params;
  const {
    loading: loadingQuery,
    data: dataQuery,
    refetch: refetchQuery,
  } = useQuery(GET_ROOM_AND_MESSAGES, { variables: { roomID: roomId } });
  const {
    data: dataSubscription,
    loading: loadingSubscription,
  } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { roomID: roomId } });
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      refetchQuery();
    });
  }, [navigation]);

  useEffect(() => {
    if (!loadingSubscription && dataSubscription) {
      const { id, body, insertedAt, user } = dataSubscription.messageAdded;
      const newMessage = {
        _id: id,
        text: body,
        createdAt: insertedAt,
        user: {
          _id: user.id,
          avatar: user.profilePic,
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
    }
  }, [dataSubscription, loadingSubscription]);

  useEffect(() => {
    if (!loadingQuery) {
      //   console.log(dataQuery);
      // }
      const { id, name, roomPic, messages: roomMessages } = dataQuery.room;
      const loadedMessages = roomMessages
        .map((item) => ({
          ...item,
          _id: item.id,
          text: item.body,
          createdAt: item.insertedAt,
          user: {
            _id: item.user.id,
            avatar: item.user.profilePic,
          },
        }))
        .sort(
          (a, b) => stringToDate(b.insertedAt) - stringToDate(a.insertedAt)
        );
      setUserId(dataQuery.user.id);
      setMessages(() => GiftedChat.append([], loadedMessages));
      setRoomInfo({ id, name, roomPic });
    }
  }, [loadingQuery, dataQuery]);

  const handleSendMessage = (message) => {
    console.log(message);
    sendMessage({ variables: { roomID: roomId, body: message[0].text } });
  };

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
        handleSendMessage={handleSendMessage}
      />
    </ScreenContainer>
  );
};
export default Room;
