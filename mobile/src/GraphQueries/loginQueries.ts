import {gql} from '@apollo/client';

export const LOGIN_QUERY = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      token
      refreshToken
    }
  }
`;
