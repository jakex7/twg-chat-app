import { Bubble } from 'react-native-gifted-chat';
import React from 'react';

const RenderBubble = (props) => {
  return (
    // Step 3: return the component
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          // Here is the color change
          backgroundColor: '#993AFC',
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
          backgroundColor: '#fff',
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
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: '#ffffff',
        },
        left: {
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
        },
      }}
    />
  );
};
export default RenderBubble;
