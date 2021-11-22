import { gql } from '@apollo/client';

export const REGISTER_QUERY = gql`
mutation RegisterMutation($userName: String!, $email: String!, $password: String!) {
    register (userName: $userName, email: $email, password: $password){
      message
    }
  }
`