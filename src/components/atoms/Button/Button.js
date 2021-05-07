import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';
import variables from '../../../assets/variables';

const Button = ({ text = '', handlePress = () => {}, ...rest }) => {
  return (
    <View {...rest}>
      <TouchableNativeFeedback onPress={handlePress}>
        <View style={styles.button}>
          <Text style={styles.text}>{text}</Text>
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
    padding: 17,
    borderRadius: 10,
  },
  text: {
    fontSize: 19,
    color: variables.colors.white,
    fontFamily: variables.fonts.regular,
  },
});

export default Button;
