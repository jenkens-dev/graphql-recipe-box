const { buildSchema } = require('graphql');

const schema = buildSchema(`
   type Query {
      recipes: [Recipe!]!
      recipe(id: ID!): Recipe!
      hello: String
      currentUser(id: ID!): User
   }

   type User {
      id: ID!
      username: String!
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

   type Mutation {
      addTagToRecipe(id: Int!, category: String!): Recipe!
   }

`);

module.exports = schema;
