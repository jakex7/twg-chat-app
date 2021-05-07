import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import variables from '../../../assets/variables';
import Input from '../../atoms/Input/Input';

const InputField = ({ placeholder = '', ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <Input {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  placeholder: {
    fontFamily: variables.fonts.regular,
    color: variables.colors.white,
  },
});

export default InputField;
