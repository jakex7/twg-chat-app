import React from 'react';
import { Composer, InputToolbar, Send } from 'react-native-gifted-chat';
import SendIcon from '../../assets/images/send.svg';

const RenderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    renderComposer={({ ...otherProps }) => (
      <Composer
        {...otherProps}
        textInputStyle={{
          backgroundColor: '#fff',
          marginRight: 15,
          paddingLeft: 12,
          paddingRight: 12,
          borderBottomLeftRadius: 12,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 0,
        }}
      />
    )}
    containerStyle={{
      backgroundColor: '#B6DEFD',
      padding: 16,
      borderWidth: 0,
    }}
    renderSend={({ ...otherProps }) => (
      <Send
        {...otherProps}
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
