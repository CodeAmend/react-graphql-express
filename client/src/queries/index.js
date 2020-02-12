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
