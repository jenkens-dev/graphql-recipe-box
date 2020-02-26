const { gql } = require('apollo-server');

const typeDefs = gql`
   type Query {
      recipes: [Recipe]!
      recipe(id: ID!): Recipe
      currentUser(id: ID!): User
      me: User
   }

   type Mutation {
      saveRecipe(recipeID: ID!): SavedRecipeResponse!
      unsaveRecipe(recipeID: ID!): SavedRecipeResponse!
      createRecipe(
         name: String!
         instructions: String!
         picture: String!
      ): SavedRecipeResponse!
      login(email: String): String
   }

   type SavedRecipeResponse {
      success: Boolean!
      message: String
      recipe: Recipe
   }

   type User {
      id: ID!
      email: String!
      savedRecipes: [Recipe]!
   }

   type Recipe {
      id: ID!
      name: String!
      instructions: String!
      picture: String!
      categories: [Tag]!
   }

   type Tag {
      id: ID!
      name: String!
   }
`;

module.exports = typeDefs;
