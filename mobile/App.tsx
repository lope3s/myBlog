import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/scenes/Login';
import Register from './src/scenes/Resgister';
import InnerAppPagination from './src/scenes/InnerAppPagination';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
})

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <ApolloProvider client={client}>
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
          <Stack.Screen
            name = 'InnerAppPagination'
            component = {InnerAppPagination}
            options = {{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
