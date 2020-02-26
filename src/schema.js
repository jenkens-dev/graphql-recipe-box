const { gql } = require('apollo-server');

const typeDefs = gql`
   type User {
      id: ID!
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

   type Query {
      recipes: [Recipe]!
   }
`;

module.exports = typeDefs;
