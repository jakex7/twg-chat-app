import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoadingPlaceholder from 'expo/build/launch/AppLoadingPlaceholder';
import { client } from './helpers/apiClient';
import Rooms from './views/Rooms';
import Room from './views/Room';

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
