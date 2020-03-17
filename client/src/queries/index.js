import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
query GetCurrentUser {
  getCurrentUser {
    username
    joinDate
    email
  }
}
`;

export const ALL_RECIPES = gql`
query AllRecipesQuery {
  allRecipes {
    name
    instructions
    description
  }
}
`;

export const SIGNUP_USERS = gql`
mutation SignupUsers($username: String!, $password: String!, $email: String!) {
  signupUser(username: $username, password: $password, email: $email) {
    token
  }
}
`;

export const SIGNIN_USER = gql`
mutation SigninUser($username: String!, $password: String!) {
  signinUser(username: $username, password: $password) {
    token
  }
}
`;
