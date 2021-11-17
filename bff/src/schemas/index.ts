import { gql } from "apollo-server"

const typeDefs = gql`

    type Message {
        message: String
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
    }
`

export default typeDefs