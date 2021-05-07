import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useMutation } from '@apollo/client';
import ScreenContainer from '../components/ScreenContainer/ScreenContainer';
import variables from '../assets/variables';
import Button from '../components/atoms/Button/Button';
import InputField from '../components/molecules/InputField/InputField';
import { LOGIN_MUTATION } from '../helpers/api';
import { signIn } from '../helpers/util';

const DEFAULT_DATA = { email: '', password: '' };

const SignIn = ({ setIsLogged }) => {
  const [userData, setUserData] = useState(DEFAULT_DATA);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
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
      <View
        style={{
          flex: 1,
          backgroundColor: variables.colors.blue.tint,
          justifyContent: 'space-between',
        }}
      >
        <View style={{}}>
          <Text
            style={{
              marginTop: 40,
              marginLeft: 16,
              fontFamily: variables.fonts.bold,
              fontSize: 36,
              color: variables.colors.purple.normal,
            }}
          >
            Welcome back
          </Text>
          <Text
            style={{
              marginTop: 16,
              marginLeft: 16,
              fontFamily: variables.fonts.bold,
              fontSize: 22,
              color: variables.colors.white,
            }}
          >
            Log in and stay in touch{'\n'}with everyone!
          </Text>
        </View>
        <View
          style={{ justifyContent: 'center', marginLeft: 36, marginRight: 36 }}
        >
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
        <Button
          text="Log in"
          style={{
            marginLeft: 67,
            marginRight: 67,
            marginBottom: 87,
            marginTop: 32,
          }}
          handlePress={handleSignIn}
        />
      </View>
    </ScreenContainer>
  );
};

export default SignIn;
