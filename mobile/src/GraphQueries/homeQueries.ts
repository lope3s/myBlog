import {gql} from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      content
      user {
        _id
        userName
      }
      userId
      likes
      comments {
        creationDate
        likes
        content
        userId
      }
      creationDate
    }
  }
`;

export const LIKE_A_POST_QUERY = gql`
  query likeAPost($postId: String!) {
    likeAPost(postId: $postId) {
      message
    }
  }
`;
