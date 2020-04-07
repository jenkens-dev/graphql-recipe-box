const { buildSchema } = require('graphql');

const schema = buildSchema(`
   type Query {
      events: [Event!]!
      recipes: [Recipe!]!
      event(id: Int!): Event!
      recipe(id: Int!): Recipe!
      hello: String
      currentUser(id: ID!): User
   }

   type Event {
      id: ID!
      title: String!
      description: String
      date: String
      attendants: [Person!]
    }

    type Person {
      id: ID!
      name: String!
      age: Int
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
      editEvent(id: Int!, title: String!, description: String!): Event!
      addTagToRecipe(id: Int!, category: String!): Recipe!
   }

`);

module.exports = schema;
