const { gql } = require('apollo-server-express');


exports.typeDefs = gql`
  type Query {
    getRecipe(id: String!): Recipe
    getAllRecipes: [Recipe]

    getCurrentUser: User
  }

  type Token {
    token: String!
  }

  type Mutation {
    addRecipe(
      name: String!,
      category: String!,
      description: String!,
      instructions: String!,
      username: String!,
    ): Recipe

    signupUser(username: String!, email: String!, password: String!): Token

    signinUser(username: String!, password: String!): Token
  }

  type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String!
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String!
    favorites: [Recipe]
  }
`;
