import { gql } from "apollo-server";

const typeDefs = gql`
    type Message {
        message: String!
    }

    type Login {
        message: String
        token: String
        refreshToken: String
    }

    type Query {
        start: String
    }

    type Mutation {
        register(userName: String!, email: String!, password: String!): Message
        login(email: String!, password: String!): Login
        post(content: String!): Message
    }
`;

export default typeDefs;
