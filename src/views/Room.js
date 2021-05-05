import React, { useState, useCallback, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { gql, useQuery } from '@apollo/client';
import { stringToDate } from '../helpers/date';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import Chat from '../components/Chat/Chat';

const Room = ({ route }) => {
  const [userId, setUserId] = useState('');
  const [roomInfo, setRoomInfo] = useState({});
  const [messages, setMessages] = useState([]);
  const { id: roomId } = route.params;
  const { loading, data } = useQuery(gql`
    query {
      user {
        id
      }
      room(id: "${roomId}") {
        id
        name
        roomPic
        messages {
          id
          body
          insertedAt
          user{
            id
            profilePic
          }
        }
      }
    }
  `);
  useEffect(() => {
    if (!loading) {
      const { id, name, roomPic, messages: roomMessages } = data.room;
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
      // console.log(mes);
      setUserId(data.user.id);
      setMessages(loadedMessages);
      setRoomInfo({ id, name, roomPic });
      // setMessages(sliceText(data.room.messages.slice(-1)[0].body, 35));
    }
  }, [loading, data]);

  return (
    <ScreenContainer roomInfo={roomInfo}>
      <Chat messages={messages} userId={userId} />
    </ScreenContainer>
  );
};
export default Room;
