import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {StoreProvider} from 'easy-peasy';
import store from './src/store/store';

import Router from './src/App.Routes';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
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
