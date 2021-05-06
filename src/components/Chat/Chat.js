import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Image, Text, View } from 'react-native';
import RenderBubble from './RenderBubble';
import RenderInputToolbar from './RenderInputToolbar';
import RenderFooter from './RenderFooter';

const Chat = ({
  messages,
  userId,
  handleSendMessage,
  handleTypingMessage,
  typingUser,
}) => {
  return (
    <GiftedChat
      messages={messages}
      onSend={handleSendMessage}
      renderTime={() => null}
      user={{
        _id: userId,
      }}
      renderBubble={RenderBubble}
      minInputToolbarHeight={100}
      renderInputToolbar={RenderInputToolbar}
      isTyping={typingUser.isTyping}
      renderFooter={(e) => <RenderFooter e={e} typingUser={typingUser} />}
      onInputTextChanged={(text) => text.length && handleTypingMessage()}
    />
  );
};
export default Chat;
