import {gql} from '@apollo/client';

export const CREATE_POST_QUERY = gql`
  mutation postMutation($content: String!) {
    post(content: $content) {
      message
    }
  }
`;
