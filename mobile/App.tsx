import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {StoreProvider} from 'easy-peasy';
import store from './src/store/store';

import Router from './src/App.Routes';
import {getItem} from './src/Services/AsyncStorageServices';

const token = await getItem('token')

console.log('token', token)

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  headers: {
    authorization: token
  }
});

const App = () => {
  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </StoreProvider>
  );
};

export default App;
