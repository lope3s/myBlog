import {gql} from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      content
      userId
      likes {
        userId
      }
      comments {
        creationDate
        likes {
          userId
        }
        content
        userId
      }
      creationDate
    }
  }
`;
