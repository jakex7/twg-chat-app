import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoadingPlaceholder from 'expo/build/launch/AppLoadingPlaceholder';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { AUTH_TOKEN } from '@env';
import Rooms from './views/Rooms';
import Room from './views/Room';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => {
  const [fontLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
  if (!fontLoaded) {
    return <AppLoadingPlaceholder />;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Rooms" component={Rooms} />
          <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
