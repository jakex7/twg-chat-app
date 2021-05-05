import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import RenderBubble from './RenderBubble';
import RenderInputToolbar from './RenderInputToolbar';

const Chat = ({ messages, userId }) => {
  return (
    <GiftedChat
      messages={messages}
      onSend={(message) => console.log(message)}
      renderTime={() => null}
      user={{
        _id: userId,
      }}
      // inverted={false}
      renderBubble={RenderBubble}
      minInputToolbarHeight={100}
      renderInputToolbar={RenderInputToolbar}
    />
  );
};
export default Chat;
