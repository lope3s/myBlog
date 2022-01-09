import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import {StoreProvider} from 'easy-peasy';
import store from './src/store/store';

import Router from './src/App.Routes';
import {getItem} from './src/Services/AsyncStorageServices';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext(async (_, {headers}) => {
  try {
    const token = await getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? 'a' + token : '',
      },
    };
  } catch (error) {
    return {
      headers: {
        ...headers,
        authorization: '',
      },
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
