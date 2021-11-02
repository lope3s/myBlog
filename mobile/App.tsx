import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './src/components/Login'
import Register from './src/components/Resgister'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'Login'
          component = {Login}
          options = {{
            headerShown: false
          }}
        />
        <Stack.Screen
          name = 'Register'
          component = {Register}
          options = {{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
