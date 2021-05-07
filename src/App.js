import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoadingPlaceholder from 'expo/build/launch/AppLoadingPlaceholder';
import { client } from './helpers/apiClient';
import Rooms from './views/Rooms';
import Room from './views/Room';
import SignIn from './views/SignIn';
import { getToken } from './helpers/util';

const Stack = createStackNavigator();

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [fontLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
  useEffect(() => {
    getToken().then((token) => {
      if (token) setIsLogged(true);
    });
  }, []);

  return !fontLoaded ? (
    <AppLoadingPlaceholder />
  ) : (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLogged ? (
            <>
              <Stack.Screen
                name="Rooms"
                children={() => <Rooms setIsLogged={setIsLogged} />}
              />
              <Stack.Screen name="Room" component={Room} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                children={() => <SignIn setIsLogged={setIsLogged} />}
              />
              {/*<Stack.Screen*/}
              {/*  name="SignUp"*/}
              {/*  children={() => <SignUp setIsLogged={setIsLogged} />}*/}
              {/*/>*/}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
