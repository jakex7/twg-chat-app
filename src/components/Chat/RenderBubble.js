import { Bubble } from 'react-native-gifted-chat';
import React from 'react';
import variables from '../../assets/variables';

const RenderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: variables.colors.purple.tint,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 12,
          marginRight: 24,
          marginTop: 12,
          padding: 12,
          width: '60%',
        },
        left: {
          backgroundColor: variables.colors.white,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 12,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          marginTop: 12,
          padding: 12,
          width: '60%',
        },
      }}
      textStyle={{
        right: {
          fontFamily: variables.fonts.regular,
          fontSize: 14,
          color: variables.colors.white,
        },
        left: {
          fontFamily: variables.fonts.regular,
          fontSize: 14,
        },
      }}
    />
  );
};
export default RenderBubble;
