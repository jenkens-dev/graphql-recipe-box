const { buildSchema } = require('graphql');

const schema = buildSchema(`
   type Query {
      hello: String
      recipes: [Recipe]!
      recipe(id: ID!): Recipe
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
`);

module.exports = schema;
