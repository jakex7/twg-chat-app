import { useEffect, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  GET_MESSAGES,
  MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE_MUTATION,
} from '../helpers/api';
import { stringToDate } from '../helpers/date';

const useMessages = (roomID) => {
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const {
    loading: loadingQuery,
    data: dataQuery,
    refetch: refetchQuery,
  } = useQuery(GET_MESSAGES, { variables: { roomID } });
  const {
    data: dataSubscription,
    loading: loadingSubscription,
  } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { roomID } });
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  useEffect(() => {
    if (!loadingQuery) {
      const { messages: roomMessages } = dataQuery.room;
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
      setAllMessages(loadedMessages);
    }
  }, [loadingQuery, dataQuery]);

  useEffect(() => {
    if (!loadingSubscription && dataSubscription) {
      const { id, body, insertedAt, user } = dataSubscription.messageAdded;
      const message = {
        _id: id,
        text: body,
        createdAt: insertedAt,
        user: {
          _id: user.id,
          avatar: user.profilePic,
        },
      };
      setNewMessage(message);
    }
  }, [loadingSubscription, dataSubscription]);

  const handleSendMessage = (text) => {
    sendMessage({ variables: { roomID, body: text } });
  };

  return {
    allMessages,
    reloadMessages: refetchQuery,
    newMessage,
    newMessageLoaded: !loadingSubscription,
    handleSendMessage,
  };
};

export default useMessages;
