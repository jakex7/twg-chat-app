import React from 'react';
import { Composer, InputToolbar, Send } from 'react-native-gifted-chat';
import SendIcon from '../../assets/images/send.svg';

const RenderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    accessoryStyle={{
      height: 68,
    }}
    renderComposer={(props) => (
      <Composer
        {...props}
        textInputStyle={{
          backgroundColor: '#fff',
          marginRight: 15,
          padding: 12,
          // borderRadius: 12,
          borderBottomLeftRadius: 12,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 0,
        }}
        placeholder=""
      />
    )}
    // renderSend
    containerStyle={{
      backgroundColor: '#B6DEFD',
      // height: 100,
      padding: 16,
      borderWidth: 0,
    }}
    renderSend={(props) => (
      <Send
        {...props}
        alwaysShowSend
        containerStyle={{
          borderWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SendIcon height="35" width="35" />
      </Send>
    )}
  />
);
export default RenderInputToolbar;
