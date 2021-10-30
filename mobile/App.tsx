import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/components/Login'
import Profile from './src/components/Profile'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'Login'
          component = {Login}
        />
        <Stack.Screen
          name = 'Profile'
          component = {Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
