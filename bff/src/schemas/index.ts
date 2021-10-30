import { gql } from "apollo-server"

const typeDefs = gql`
    type Query {
        start: String
    }

`

export default typeDefs