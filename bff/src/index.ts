import { ApolloServer } from 'apollo-server';
import typeDefs from './schemas';
import resolvers from './resolvers';

import { RegisterAPI } from './dataSources/registerApi';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            registerAPI: new RegisterAPI()
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`\nServer running on ${url}`)
})