import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import variables from '../../../assets/variables';

const Input = ({
  value = '',
  handleChange = () => {},
  isPassword = false,
  ...rest
}) => {
  return (
    <View {...rest}>
      <TextInput
        value={value}
        onChangeText={handleChange}
        secureTextEntry={isPassword}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: variables.colors.white,
    color: variables.colors.purple.shade,
    padding: 10,
    borderRadius: 10,
    fontFamily: variables.fonts.regular,
  },
});

export default Input;
