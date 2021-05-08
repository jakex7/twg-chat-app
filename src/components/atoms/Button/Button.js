import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';
import variables from '../../../assets/variables';

const Button = ({
  text = '',
  handlePress = () => {},
  isSmall = false,
  ...rest
}) => {
  return (
    <View {...rest}>
      <TouchableNativeFeedback onPress={handlePress}>
        <View
          style={[
            styles.button,
            isSmall ? styles.smallButton : styles.bigButton,
          ]}
        >
          <Text
            style={[
              styles.text,
              isSmall ? styles.smallButtonText : styles.bigButtonText,
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: variables.colors.purple.normal,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  smallButton: { padding: 8 },
  bigButton: { padding: 17 },
  text: {
    color: variables.colors.white,
    fontFamily: variables.fonts.regular,
  },
  smallButtonText: { fontSize: 14 },
  bigButtonText: { fontSize: 19 },
});

export default Button;
