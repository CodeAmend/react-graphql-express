import { gql } from 'apollo-boost';


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
mutation SingupUsers($username: String!, $password: String!, $email: String!) {
  signupUser(username: $username, password: $password, email: $email) {
    token
  }
}
`;
