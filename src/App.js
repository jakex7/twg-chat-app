import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoadingPlaceholder from 'expo/build/launch/AppLoadingPlaceholder';
import Rooms from './views/Rooms';

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
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Rooms" component={Rooms} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
