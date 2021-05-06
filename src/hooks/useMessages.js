import { useEffect, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  GET_MESSAGES,
  MESSAGE_ADDED_SUBSCRIPTION,
  MESSAGE_TYPING_SUBSCRIPTION,
  SEND_MESSAGE_MUTATION,
  TYPING_MESSAGE_MUTATION,
} from '../helpers/api';
import { stringToDate } from '../helpers/date';

const useMessages = (roomID) => {
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const [typingUser, setTypingUser] = useState({
    isTyping: false,
    id: '',
    firstName: '',
    profilePic: '',
  });
  const {
    loading: loadingQuery,
    data: dataQuery,
    refetch: refetchQuery,
  } = useQuery(GET_MESSAGES, { variables: { roomID } });
  const {
    data: dataAddSubscription,
    loading: loadingAddSubscription,
  } = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, { variables: { roomID } });
  const {
    data: dataTypingSubscription,
    loading: loadingTypingSubscription,
  } = useSubscription(MESSAGE_TYPING_SUBSCRIPTION, { variables: { roomID } });
  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);
  const [typingMessageMutation] = useMutation(TYPING_MESSAGE_MUTATION);

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
    if (!loadingAddSubscription && dataAddSubscription) {
      const { id, body, insertedAt, user } = dataAddSubscription.messageAdded;
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
  }, [loadingAddSubscription, dataAddSubscription]);
  useEffect(() => {
    if (!loadingTypingSubscription && dataTypingSubscription) {
      setTypingUser({
        isTyping: true,
        ...dataTypingSubscription.typingUser,
      });
      const timeout = setTimeout(
        () => setTypingUser((prevState) => ({ ...prevState, isTyping: false })),
        5000
      );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loadingTypingSubscription, dataTypingSubscription]);

  const handleSendMessage = (text) => {
    sendMessageMutation({ variables: { roomID, body: text } });
  };
  const handleTypingMessage = () => {
    typingMessageMutation({ variables: { roomID } });
  };

  return {
    allMessages,
    reloadMessages: refetchQuery,
    newMessage,
    newMessageLoaded: !loadingAddSubscription,
    handleSendMessage,
    handleTypingMessage,
    typingUser,
  };
};

export default useMessages;
