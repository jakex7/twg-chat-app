import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import RenderBubble from './RenderBubble';
import RenderInputToolbar from './RenderInputToolbar';

const Chat = ({ messages, userId, handleSendMessage }) => {
  return (
    <GiftedChat
      messages={messages}
      onSend={handleSendMessage}
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
