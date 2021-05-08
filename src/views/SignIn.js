import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import Button from '../components/atoms/Button/Button';
import InputField from '../components/molecules/InputField/InputField';
import { LOGIN_MUTATION } from '../helpers/api';
import { signIn } from '../helpers/util';
import styles from './Sign.styles';

const DEFAULT_DATA = { email: '', password: '' };

const SignIn = ({ setIsLogged }) => {
  const [userData, setUserData] = useState(DEFAULT_DATA);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const navigation = useNavigation();
  const handleInputChange = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSignIn = () => {
    loginMutation({ variables: userData })
      .then((data) => {
        signIn(data.data.loginUser.token);
        setIsLogged(true);
      })
      .catch((e) => {
        setUserData(DEFAULT_DATA);
      });
  };
  return (
    <ScreenContainer bgColor="fill">
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subTitle}>
            Log in and stay in touch{'\n'}with everyone!
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <InputField
            placeholder="e-mail address"
            value={userData.email}
            handleChange={(text) => handleInputChange('email', text)}
          />
          <InputField
            placeholder="password"
            value={userData.password}
            handleChange={(text) => handleInputChange('password', text)}
            isPassword
          />
        </View>
        <View>
          <Button
            text="Log in"
            style={styles.buttonAdditionalStyles}
            handlePress={handleSignIn}
          />
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SignIn;
