import { gql } from "apollo-server";

const typeDefs = gql`
    type Message {
        message: String!
    }

    type User {
        _id: String
        userName: String
    }

    type Login {
        message: String
        token: String
        refreshToken: String
    }

    type Like {
        userId: String
        postId: String
        _id: String
    }

    type Comment {
        _id: String
        postId: String
        creationDate: String
        likes: [Like]
        content: String
        userId: String
        lastModified: String
    }

    type Post {
        content: String
        userId: String
        _id: String
        likes: [Like]
        comments: [Comment]
        creationDate: String
        lastModified: String
        user: User
    }

    type Query {
        start: String
        getAllPosts: [Post]
    }

    type Mutation {
        register(userName: String!, email: String!, password: String!): Message
        login(email: String!, password: String!): Login
        post(content: String!): Message
    }
`;

export default typeDefs;
