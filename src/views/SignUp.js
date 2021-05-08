import React, { useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import Button from '../components/atoms/Button/Button';
import InputField from '../components/molecules/InputField/InputField';
import { REGISTER_MUTATION } from '../helpers/api';
import styles from './Sign.styles';

const DEFAULT_DATA = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirmation: '',
};

const SignUp = () => {
  const [userData, setUserData] = useState(DEFAULT_DATA);
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const navigation = useNavigation();
  const handleInputChange = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSignUp = () => {
    registerMutation({ variables: userData })
      .then((data) => {
        navigation.navigate('SignIn');
      })
      .catch((e) => {
        setUserData(DEFAULT_DATA);
      });
  };
  return (
    <ScreenContainer bgColor="fill">
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create account</Text>
        </View>
        <View style={styles.inputsContainer}>
          <InputField
            placeholder="e-mail address"
            value={userData.email}
            handleChange={(text) => handleInputChange('email', text)}
          />
          <InputField
            placeholder="first name"
            value={userData.firstName}
            handleChange={(text) => handleInputChange('firstName', text)}
          />
          <InputField
            placeholder="last name"
            value={userData.lastName}
            handleChange={(text) => handleInputChange('lastName', text)}
          />
          <InputField
            placeholder="password"
            value={userData.password}
            handleChange={(text) => handleInputChange('password', text)}
            isPassword
          />
          <InputField
            placeholder="password confirmation"
            value={userData.passwordConfirmation}
            handleChange={(text) =>
              handleInputChange('passwordConfirmation', text)
            }
            isPassword
          />
        </View>
        <View>
          <Button
            text="Sign up"
            style={styles.buttonAdditionalStyles}
            handlePress={handleSignUp}
          />
          <Text style={styles.footerText}>
            By clicking sign up button you agree with the{' '}
            <Text
              onPress={() => Linking.openURL('https://example.com/')}
              style={styles.footerLink}
            >
              terms and conditions
            </Text>{' '}
            and the{' '}
            <Text
              onPress={() => Linking.openURL('https://example.com/')}
              style={styles.footerLink}
            >
              privacy policy.
            </Text>
            {'\n\n'}
            Have an account?{' '}
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={styles.footerLink}
            >
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignUp;
