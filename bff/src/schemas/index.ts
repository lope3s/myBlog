import { gql } from "apollo-server"

const typeDefs = gql`

    type Message {
        message: String
    }

    type Login {
        message: String
        token: String
        refreshToken: String
    }

    input User {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        start: String
    }

    type Mutation {
        register(userName: String!, email: String!, password: String!): Message
        login(email: String!, password: String!): Login
    }
`

export default typeDefs